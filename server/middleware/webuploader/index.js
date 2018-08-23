const WU = require('./webuploader')
/**
 * @param  {koa.ctx} ctx
 * @param  {koa.next} next
 */
module.exports = async (ctx, next) => {
  const { status, md5 } = ctx.request.body
  let uInfo = {}

  switch (status) {
    // 秒传验证  WU.beforeSendFile 生产的md5
    case 'md5Check':
      uInfo = {
        ifExist: true,
        md5: md5
      }
      break
    // 分片验证是否已传过，用于断点续传 WU.beforeSend
    case 'chunkCheck':
      break
    // 合并请求 WU.afterSendFile 发送完成后触发
    case 'chunksMerge':
      break
    // 传输文件
    default:
      break
  }

  return uInfo
}
