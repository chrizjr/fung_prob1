//Node JS

var mysql = require('mysql');

//Set MySQL search query
var querystring = 'christmas';
var sql = 'SELECT * FROM search WHERE superTag = ' + mysql.escape(querystring);

//Set MySQL connection parameters
var con = mysql.createConnection({
  host: "hack-the-runway.cj0tudnwqj0k.ap-northeast-2.rds.amazonaws.com",
  user: "user",
  password: "MasterPassword",
  database: "test"
});

//search the tables for results
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result);
});

