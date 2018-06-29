const fs = require('fs')

function file(path) {
  let content = fs.readFileSync(path)
  return content
}

module.exports = file
