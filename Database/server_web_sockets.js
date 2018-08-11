/** @file Server side code for handling web socket requests
  * @author Muhammad Tirmazi
  */

const socketIO = require('socket.io');

const addAuthor = require('./web_socket_add_author');
const contribute = require('./web_socket_contribute');
const frontPage = require('./web_socket_front_page');
const search = require('./web_socket_search');
const refinedSearch = require('./web_socket_refined_search');
const viewConferences = require('./web_socket_view_conferences')
const removePaper = require('./web_socket_remove_paper.js');

/** Adds handles for all web socket requests 
  * @param {object} httpServer The nodejs http server object associated with the express 4.0x server.
  */
const serverAddWebSocketHandlers = async httpServer => {
	const io = socketIO(httpServer);

	io.on('connection', async webSocket => {
		await addAuthor.handleAddAuthorWebSockets(webSocket);
		await frontPage.handleFrontPageWebSockets(webSocket);
		await search.handleSearchWebSockets(webSocket);
		await refinedSearch.handleRefinedSearchWebSockets(webSocket);
		await viewConferences.handleViewConferenceWebSockets(webSocket);
		await removePaper.handleRemovePaperWebSockets(webSocket);
	});
};

module.exports = {
	serverAddWebSocketHandlers
};