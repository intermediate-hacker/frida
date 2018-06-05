const http = require('http');

http.get({
	hostname: 'localhost',
	port: 8080,
	path: '/static',
	agent: false,
	auth: 'Admin:secret1234'
}, res => {
	console.log(res.statusCode);
});