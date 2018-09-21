const fs = require('fs')
const path = require('path')
const util = require('util')
const formidable = require('formidable')
const _ = require('underscore')
const config = require('./config')
const wu = require('./webuploader')
/**
 * @param  {koa.ctx} ctx
 * @param  {koa.next} next
 */
module.exports = async (ctx, next) => {
  var uploadResult
  var lockMark = [] //用于分片合并时的同步标识位

  const form = new formidable.IncomingForm({
    uploadDir: 'tmp',
    encoding: 'utf-8'
  }) //避免EXDEV问题
  form.parse(ctx.req, function(err, fields, files) {
    // console.log(util.inspect({ fields: fields, files: files }))
    console.log(fields)
    if (_.isUndefined(fields.status)) {
      //分片上传 传输文件
      //分片的元数据必须以文件的形式（当然数据库也行）持久化，而不应该持久化在node的全局变量中，避免node进程重启而导致的元数据丢失，这里处理的方式参照php版本的后端
      //具体详情可见https://github.com/kazaff/me.kazaff.article/blob/master/%E8%81%8A%E8%81%8A%E5%A4%A7%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.md
      console.log('传输文件')
      var upDir = ''
      var isChunks = !(
        _.isUndefined(fields.chunks) || parseInt(fields.chunks) <= 0
      )
      if (isChunks) {
        upDir = path.join(config.uploadDir, wu.createUniqueFileName(fields))
      } else {
        upDir = config.uploadDir
      }

      fs.mkdir(upDir, function(err) {
        if (_.isNull(err) || err.code === 'EEXIST') {
          var newFileName = ''

          if (isChunks) {
            //更新tmp文件的修改时间
            fs.open(upDir + '.tmp', 'w', function(err, fd) {
              if (err) {
                //todo
                console.error(err)
              } else {
                var time = new Date()
                fs.futimes(fd, time, time, function(err) {
                  if (err) {
                    //todo
                    console.error(err)
                  }

                  fs.close(fd)
                })
              }
            })

            newFileName = fields.chunk
          } else {
            newFileName = wu.randomFileName(path.extname(files.file.name))
          }

          fs.rename(files.file.path, path.join(upDir, newFileName), function(
            err
          ) {
            if (err) {
              //todo
              console.error(err)
              uploadResult = { status: 0 }
            }

            uploadResult = { status: 1, path: ' + newFileName + ' }
          })
        } else {
          //todo
          console.error(err)
          uploadResult = { status: 0 }
        }
      })
    } else if (fields.status == 'md5Check') {
      //秒传校验 WU.beforeSendFile 生产的md5
      //todo 模拟去数据库中校验md5是否存在
      console.log(`md5Check : ${fields.md5}`)
      if (fields.md5 == 'b0201e4d41b2eeefc7d3d355a44c6f5a') {
        uploadResult = { ifExist: 1, path: 'kazaff2.jpg' }
      } else {
        uploadResult = { ifExist: 0 }
      }
    } else if (fields.status == 'chunkCheck') {
      //分片校验是否已传过，用于断点续传 WU.beforeSend
      console.log('chunkCheck')
      console.dir(fields)
      fs.stat(
        path.join(config.uploadDir, fields.name, fields.chunkIndex),
        function(err, stats) {
          if (err || stats.size != fields.size) {
            uploadResult = { ifExist: 0 }
          } else {
            uploadResult = { ifExist: 1 }
          }
        }
      )
    } else if (fields.status == 'chunksMerge') {
      //分片合并 合并请求 WU.afterSendFile 发送完成后触发
      //同步机制
      console.log('chunksMerge')
      console.dir(fields)
      if (_.contains(lockMark, fields.name)) {
        uploadResult = { status: 0 }
      } else {
        lockMark.push(fields.name)

        var newFileName = wu.randomFileName(fields.ext)
        var targetStream = fs.createWriteStream(
          path.join(config.uploadDir, newFileName)
        )
        wu.chunksMerge(
          path.join(config.uploadDir, fields.name),
          targetStream,
          fields.chunks,
          function(err) {
            if (err) {
              //todo
              console.error(err)
              uploadResult = { status: 0 }
              return
            }

            targetStream.end(function() {
              //删除文件夹和tmp
              fs.unlink(
                path.join(config.uploadDir, fields.name) + '.tmp',
                function(err) {
                  if (err) {
                    //todo
                    console.error(err)
                  }
                }
              )
              fs.rmdir(path.join(config.uploadDir, fields.name), function(err) {
                if (err) {
                  //todo
                  console.error(err)
                }
              })

              lockMark = _.without(lockMark, fields.name)

              //todo 这里其实需要把该文件和其前端校验的md5保存在数据库中，供秒传功能检索

              uploadResult = { status: 1, path: "' + newFileName + '" }
            })
          }
        )
      }
    }
  })
  ctx.wu = uploadResult
  await next()
}
