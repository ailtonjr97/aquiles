const dotenv = require("dotenv");
dotenv.config();

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
  
    const mysql = require("mysql2/promise");
    const pool = mysql.createPool({
        host: process.env.SQLHOST,
        port: '3306',
        user: process.env.SQLUSER,
        password: process.env.SQLPASSWORD,
        database: process.env.SQLDATABASE,
        waitForConnections: true,
        connectionLimit: 40,
        maxIdle: 40, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000
      });
    global.connection = pool;
    return pool;
  }

  connect();

  let produtos = async(req, res)=>{
    const conn = await connect();
    const resultsQuery = `SELECT COUNT(*) AS contagem FROM sb1_produtos`;
    const contentsQuery = `SELECT cod, descri FROM sb1_produtos limit 200`;
    
    const [results] = await conn.query(resultsQuery);
    const [contents] = await conn.query(contentsQuery);

    return [results, contents];
}
module.exports = {
  produtos,
};