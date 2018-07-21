const fs = require('fs')
const getSqlMap = require('./get-sql-map.js')

let sqlContentMap = {}
function getSqlContent(filename, path) {
  const content = fs.readFileSync(path, 'binary')
  sqlContentMap[filename] = content
}

function getSqlContentMap() {
  const sqlMap = getSqlMap()
  // console.log(sqlMap)

  for (let key in sqlMap) {
    getSqlContent(key, sqlMap[key])
  }

  return sqlContentMap
}

module.exports = {
  getSqlContentMap
}
