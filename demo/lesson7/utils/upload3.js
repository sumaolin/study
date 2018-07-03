const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')

function mkdirSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

function getSuffixName(fileName) {
  let arrName = fileName.split('.')
  return arrName[arrName.length - 1]
}

function uploadFile(ctx, opts) {
  const req = ctx.req
  const res = ctx.res
  const busboy = new Busboy({ headers: req.headers })

  const fileType = opts.fileType || 'common'
  const filePath = path.join(opts.filePath, fileType)
  const mkdirResult = mkdirSync(filePath)

  return new Promise((resolve, reject) => {
    console.log('文件上传中……')

    const result = {
      success: false,
      message: '',
      data: null
    }
    // 处理文件上传
    busboy.on('file', (fieldName, file, fileName, encoding, minetype) => {
      const busbuyParams = { fieldName, file, fileName, encoding, minetype }
      console.log('busboy file params: ')
      console.dir(busbuyParams)

      const newfileName =
        Math.random()
          .toString(16)
          .substr(2) +
        '.' +
        getSuffixName(fileName)
      const _uploadFilePath = path.join(filePath, newfileName)
      const saveTo = path.join(_uploadFilePath)

      file.pipe(fs.createWriteStream(saveTo))
      file.on('end', () => {
        console.log('上传文件成功')
        result.success = true
        result.message = '上传文件成功'
        result.data = {
          pictureUrl: `//${ctx.host}/images/${fileType}/${newfileName}`
        }
        resolve(result)
      })
    })
    // 处理表单域
    busboy.on(
      'field',
      (
        fieldName,
        val,
        fieldnameTruncated,
        valTruncated,
        encoding,
        minetype
      ) => {
        const busbuyParams = {
          fieldName,
          val,
          fieldnameTruncated,
          valTruncated,
          encoding,
          minetype
        }
        console.log('busboy field params: ')
        console.dir(busbuyParams)
        result.formData[fieldName] = val
      }
    )
    // 处理完成
    busboy.on('finish', () => {
      console.log('busboy finish')
      resolve(result)
    })
    // 错误处理
    busboy.on('error', err => {
      console.log(`busboy error: ${err}`)
      reject(result)
    })
    req.pipe(busboy)
  })
}

module.exports = {
  uploadFile
}
