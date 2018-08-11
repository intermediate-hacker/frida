/** @file Server side code for handling
  * web socket requests sent by the front page.
  * @author Muhammad Tirmazi
  */

const dbRetrievals = require('./db_retrievals');

/** Handles websocket requests sent by the front
  * including 1) request to get the most recent papers
  * @param {object} webSocket The socket.io websocket object associated with the express 4.0x server
  */
const handleFrontPageWebSockets = async webSocket => {
	webSocket.on('msgRecentPaperRequest', async msg => {
		try {
			const paperList = await dbRetrievals.retrieveFiveRecentPapers();
			webSocket.emit('msgRecentPaperResponse', paperList);
		} catch (err) {
			console.log(`[WebSockets][handleAddAuthorWebSockets]: ${err}`);
			throw err;
		}
	});

	webSocket.on('msgRecentConferencesRequest', async msg => {
		try {
			const conferencesList = await dbRetrievals.retrieveFiveRecentConferences();
			webSocket.emit('msgRecentConferencesResponse', conferencesList);
		} catch (err) {
			console.log(`[WebSockets][handleAddAuthorWebSockets]: ${err}`);
			throw err;
		}
	});
};

module.exports = {
	handleFrontPageWebSockets
};

