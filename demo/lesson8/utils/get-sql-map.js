const path = require('path')
const fs = require('fs')
const walkFile = require('./walk-file')

function getSqlMap() {
  const sqlPath = path.resolve(__dirname, '../db')
  const sqlMap = walkFile(sqlPath, 'sql')
  // console.log(sqlMap)

  return sqlMap
}

module.exports = getSqlMap
