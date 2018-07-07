/** @file Server side code for handling web socket requests
  * @author Muhammad Tirmazi
  */

const socketIO = require('socket.io');

const addAuthor = require('./web_socket_add_author');

/** Adds handles for all web socket requests 
  * @param {object} httpServer The nodejs http server object associated with the express 4.0x server.
  */
const serverAddWebSocketHandlers = async httpServer => {
	const io = socketIO(httpServer);

	io.on('connection', async webSocket => {
		await addAuthor.handleAddAuthorWebSockets(webSocket);
	});
};

module.exports = {
	serverAddWebSocketHandlers
};