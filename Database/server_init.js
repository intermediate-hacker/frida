const express = require('express');
const expressApp = express();
const http = require('http');
const httpServer = http.Server(expressApp);
const basicAuth = require('express-basic-auth');
const fs = require('fs');
const https = require('https');

// const customAuthorization = (username, password) => {
// 	console.log('Custom Authorization Happening.');
// 	return username === 'admin' &&  password === 'tirmazi';
// };

const initializeServerSSL = () => {
	const privateKey = fs.readFileSync('server.key');
	const certificate = fs.readFileSync('server.crt');

	const credentials = { key: privateKey, cert: certificate };
	return https.createServer(credentials, expressApp);
};

const httpsServer = initializeServerSSL();

const initializeServer = () => {
	const staticAuth = basicAuth({
		users : {
			'tirmazi' : 'tirmazi'
		},
		challenge : true
	});

	expressApp.get('/', (req, res) => {
		res.sendFile(__dirname + '/index.html');
	});

	expressApp.get('/upload', staticAuth, (req, res) => {
		res.sendFile(__dirname + '/upload.html');
		// res.status(200).send('You passed');
	});

	httpServer.listen(80, () => {
		console.log('HTTP Server Listening on: *:80');
	});

	// httpsServer.listen(443, () => {
	// 	console.log('HTTPS Server Listening on: *:443');
	// });
};

initializeServer();