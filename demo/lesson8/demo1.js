const mysql = require('mysql')
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '618819',
  database: 'session_demo'
})

connection.query(
  'SELECT * FROM _mysql_session_store',
  (error, results, fields) => {
    if (error) throw error
    console.log(results)
    console.log(fields)
    // console.log(connection)
    // connection.release()
  }
)
connection.end()
