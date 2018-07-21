const { query } = require('./utils/db')
const fs = require('fs')
const { getSqlContentMap } = require('./utils/get-sql-content-map')

function eventLog(err, sqlFile, index) {
  if (err) {
    console.error(`Error file sql: ${sqlFile} 第 ${index + 1}行执行失败了！`)
  } else {
    console.log(`success sql file ${sqlFile} action ${index + 1}`)
  }
}

const sqlContentMap = getSqlContentMap()
console.log(sqlContentMap)

async function creatAllTables() {
  for (let key in sqlContentMap) {
    let sqlShell = sqlContentMap[key]
    let arrSqlShell = sqlShell.split(';')
    for (let [i, shellItem] of arrSqlShell.entries()) {
      if (shellItem.trim()) {
        const result = await query(shellItem)
        if (result.serverStatus * 1 === 2) {
          eventLog(null, key, i)
        } else {
          eventLog(true, key, i)
        }
      }
    }
  }

  console.log('脚步执行完成！')
  process.exit(0)
}

creatAllTables()
