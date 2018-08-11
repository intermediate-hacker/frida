/** @file Server side code for handling
  * web socket requests sent by the view conferences page.
  * @author Muhammad Tirmazi
  */

const dbRetrievals = require('./db_retrievals');

/** Handles websocket requests sent by the view conferences
  * page. For now, just a request to list all conferences in DB.
  * @param {object} webSocket The socket.io websocket object associated with the express 4.0x server
  */
const handleViewConferenceWebSockets = async webSocket => {
	webSocket.on('msgViewConferenceRequest', async msg => {
		try {
			const conferencesList = await dbRetrievals.retrieveAllRegisteredConferences();
			webSocket.emit('msgViewConferenceResponse', conferencesList);
		} catch (err) {
			console.log(`[WebSockets][handleViewConferenceWebSockets]: ${err}`);
			throw err;
		}
	});
};

module.exports = {
	handleViewConferenceWebSockets
};

