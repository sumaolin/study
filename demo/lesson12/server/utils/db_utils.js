const allConfig = require('../../config')
const config = allConfig.database
const mysql = require('mysql')

const pool = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE
})

function query(sql, value) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, value, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

function creatTable(sql) {
  return query(sql, [])
}

function insertData(table, value) {
  let _sql = 'INSERT INTO ?? SET ?'
  return query(_sql, [table, value])
}

function select(table, keys) {
  const _sql = 'SELECT ?? FROM ?'
  return query(_sql, [keys, table])
}

module.exports = {
  query,
  select,
  creatTable,
  insertData
}
