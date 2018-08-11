/** @file Server side code for handling
  * web socket requests sent by the refined search page.
  * @author Muhammad Tirmazi
  */

const dbSearch = require('./db_search');

/** Handles websocket requests sent by the front
  * including 1) request to get the most recent papers
  * @param {object} webSocket The socket.io websocket object associated with the express 4.0x server
  */
const handleRefinedSearchWebSockets = async webSocket => {
	webSocket.on('msgSearchRefinedRequest', async msg => {
		try {
			const paperList = await dbSearch.searchRefined(msg);
			webSocket.emit('msgSearchBasicResponse', paperList);
		} catch (err) {
			console.log(`[WebSockets][handleRefinedSearchWebSockets]: ${err}`);
			throw err;
		}
	});
};

module.exports = {
	handleRefinedSearchWebSockets
};

