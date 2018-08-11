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

const serverForm = require('./server_form');
// const serverDatabaseBrowse = require('./server_db_browse');
const serverRoute = require('./server_route');
const serverWebSockets = require('./server_web_sockets');

/**
  * Creates the HTTP server along with all the paths. 
  * Also creates a static server that forwards all files
  * in the directory called 'public'.
  */
const initializeServer = async () => {
	expressApp.use(express.static('public'));

	console.log("Routing pages");
	serverRoute.serverRoutePages(expressApp);

	try {
		console.log("Adding Form Listeners");
		await serverForm.serverAddFormListeners(expressApp);

		// console.log("Adding database browsing handlers");		
		// await serverDatabaseBrowse.serverAddDatabaseBrowseListeners(expressApp);

		console.log("Adding web socket handlers");
		await serverWebSockets.serverAddWebSocketHandlers(httpServer);
	} catch (err) {
		console.log(err);
	}

	httpServer.listen(80, () => {
		console.log('HTTP Server Listening on: *:80');
	});
};

initializeServer();