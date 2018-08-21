const express = require('express')
var mysql = require('./mysql')

var app = express()

app.use(express.static('public'))


app.get('/', (req, res)=>{
	res.sendFile(__dirname+'/index.html');
})

app.get('/getItems', (req, res)=>{
  	let currentPage = req.query.page > 0 ? req.query.page : 1;
  	let start = (currentPage-1)*req.query.pageSize
  	let end = req.query.pageSize*currentPage
  	
	mysql.query('select * from qiushi order by id desc limit '+start+","+end)
		.then(result=>{
			res.json(result)
		},err=>{
			console.log(err);
		});
})
var server = app.listen(80, ()=>{
	var host = server.address().address
	var port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})