const fs = require('fs')
const path = require('path')

function walkFile(pathReslove, mine) {
  const files = fs.readdirSync(pathReslove)
  let fileList = {}

  for (let [i, item] of files.entries()) {
    // console.log(item)

    const arrItem = item.split('.')

    let ext = arrItem.length > 1 ? arrItem[arrItem.length - 1] : 'undefined'
    // console.log(ext)

    if (ext === mine) {
      fileList[arrItem[0]] = path.join(pathReslove, item)
    }
  }
  // console.log(fileList)

  return fileList
}

module.exports = walkFile
