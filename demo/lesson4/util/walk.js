const fs = require('fs')
const Mines = require('./mines')

function walk(reqPath) {
  let files = fs.readdirSync(reqPath)

  let dirList = [],
    fileList = []

  for (let i = 0, len = files.length; i < len; i++) {
    let item = files[i]
    let itemMine = Mines.parseMine(item)
    if (typeof itemMine === 'undefined') {
      dirList.push(files[i])
    } else {
      fileList.push(files[i])
    }
  }
  const result = dirList.concat(fileList)
  return result
}

module.exports = walk
