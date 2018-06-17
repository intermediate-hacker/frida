/** @file Contains initialization code for the server.
  * The server I use is Express (4.0x) combined with
  * WebSockets via socket.io.
  * @author Muhammad Tirmazi
  */

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

// const initializeServerSSL = () => {
// 	const privateKey = fs.readFileSync('server.key');
// 	const certificate = fs.readFileSync('server.crt');

// 	const credentials = { key: privateKey, cert: certificate };
// 	return https.createServer(credentials, expressApp);
// };

// const httpsServer = initializeServerSSL();

/**
  * Creates the HTTP server along with all the paths. 
  * Also creates a static server that forwards all files
  * in the directory called 'public'.
  */
const initializeServer = () => {
	const staticAuth = basicAuth({
		users : {
			'tirmazi' : 'tirmazi'
		},
		challenge : true
	});

	expressApp.use(express.static('public'));

	expressApp.get('/', (req, res) => {
		res.sendFile(__dirname + '/index.html');
	});

	httpServer.listen(80, () => {
		console.log('HTTP Server Listening on: *:80');
	});

	// httpsServer.listen(443, () => {
	// 	console.log('HTTPS Server Listening on: *:443');
	// });
};

initializeServer();