const mysql = require('mysql')

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '618819',
  database: 'koa_demo'
})

const query = function(sql, value) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, value, (err, results, fields) => {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }

          connection.release()
        })
      }
    })
  })
}

module.exports = {
  query
}
