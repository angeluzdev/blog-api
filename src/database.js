const mysql = require('mysql2');
//console.log(process.env.DATABASE_NAME)
const connection = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASS
})

connection.getConnection((err, connection) => {
  if(err) throw err;
  connection.release();
  console.log('DB is connected');
  return;
})

const pool = connection.promise();

module.exports = pool;