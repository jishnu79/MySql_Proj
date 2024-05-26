const mysql = require('mysql2/promise')
require('dotenv')

const mySqlPool = mysql.createPool({
      host:'localhost', //process.env.DB_HOST
      user:'root',  //process.env.DB_USERNAME
      password:'W7301@jqir#',// process.env.DB_PASSWORD
      database:'cafe' //process.env.DB_NAME
})
 
module.exports = mySqlPool 