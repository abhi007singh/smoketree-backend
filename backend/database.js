var mysql = require("mysql2");

const mysqlUser = process.env.MYSQL_USERNAME;
const mysqlPass = process.env.MYSQL_PASSWORD;
const mysqlDB = process.env.MYSQL_DATABASE;

var conn = mysql.createConnection({
  host: "localhost",
  user: mysqlUser,
  password: mysqlPass,
  database: mysqlDB,
});

conn.connect((err) => {
  if (err) throw err;
  console.log("MySQL: Connected!");
});

module.exports = conn;
