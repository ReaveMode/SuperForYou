var mysql = require('mysql');


var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'remotemysql.com',
  user: 'QK5ELcA6fI',
  password: 'inh2gm3EMp',
  database: 'QK5ELcA6fI'
});
exports.pool = pool;
