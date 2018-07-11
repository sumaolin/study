const mysql = require('mysql')

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '618819',
  database: 'session_demo'
})

pool.getConnection(function(err, connection) {
  connection.query(
    'SELECT * FROM _mysql_session_store',
    (error, results, fields) => {
      if (error) throw error
      console.log('results: ')

      console.log(results)

      console.log('fields: ')
      console.log(fields)

      connection.release()
    }
  )
})
