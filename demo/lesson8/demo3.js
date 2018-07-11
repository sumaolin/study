const { query } = require('./async_db')

async function selectAllData() {
  const sql = 'select * from _mysql_session_store'
  const resultRow = await query(sql)
  return resultRow
}

async function getData() {
  const dataS = await selectAllData()
  console.log(dataS)
}

getData()
