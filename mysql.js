const mysql = require('mysql');

const host = '127.0.0.1';
const port = 30000;

//创建数据库连接
const connPool = mysql.createPool({
	host: '47.254.70.61',
	port: 3306,
	user: 'root',
	password: '12345678',
	database: 'qiubai_db',
	connectionLimit: 10,
});

function query(sql, params){
	return new Promise((resolve, reject)=>{
			connPool.getConnection((err, connection)=>{
				if(err){
					console.log(err)
				}else{
					connection.query(sql, (err, result)=>{
						connection.release();
						if(err){
							reject(err);
						}else{
							resolve(result)
						}
					})
				}
			})
		});
}

exports.query=query

