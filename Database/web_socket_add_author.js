/** @file Server side code for handling
  * web socket requests sent by the add author form.
  * @author Muhammad Tirmazi
  */

const dbRetrievals = require('./db_retrievals');

/** Handles websocket requests sent by the add author form
  * including 1) request to get institution list
  * @param {object} webSocket The socket.io websocket object associated with the express 4.0x server
  */
const handleAddAuthorWebSockets = async webSocket => {
	webSocket.on('msgAddAuthorInstitutionListRequest', async msg => {
		try {
			const institutionList = await dbRetrievals.retrieveAllRegisteredInstitutions();
			webSocket.emit('msgAddAuthorInstitutionListResponse', institutionList);
		} catch (err) {
			console.log(`[WebSockets][handleAddAuthorWebSockets]: ${err}`);
		}
	});
};

module.exports = {
	handleAddAuthorWebSockets
};

