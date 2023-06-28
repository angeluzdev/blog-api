const mysql = require('mysql2');
const config = require('./config/config');

const connection = mysql.createPool({
  host: config.dbHost,
  user: config.dbUser,
  database: config.dbName,
  password: config.dbPass,
  port: config.dbPort
})

connection.getConnection((err, connection) => {
  if(err) throw err;
  connection.release();
  console.log('DB is connected');
  return;
})

const pool = connection.promise();

module.exports = pool;