const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});

const config = {
  dbName: process.env.DATABASE_NAME,
  dbHost: process.env.DATABASE_HOST,
  dbPass: process.env.DATABASE_PASS,
  dbUser: process.env.DATABASE_USER,
  dbPort: process.env.DATABASE_PORT,
  secretKey: process.env.SECRET_KEY
};

module.exports = config;