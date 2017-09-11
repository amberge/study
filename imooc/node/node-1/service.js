const http = require('http');

http.createServer((req, res)=>{
	res.statusCode = 200;
	res.setHeader('Content-Type','text/plain');
	res.end('Hello world');
}).listen(3000,'127.0.0.1',()=>{
	console.log("server is running at %d:",3000);
})