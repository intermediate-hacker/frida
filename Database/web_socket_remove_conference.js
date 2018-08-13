/** @file Server side code for handling
  * web socket requests sent by the remove conference page.
  * @author Muhammad Tirmazi
  */

const dbRetrievals = require('./db_retrievals');
const dbRemovals = require('./db_removals')
const credentials = require('./credentials');

/** Handles websocket requests sent by the remove conference
  * page. 
  * @param {object} webSocket The socket.io websocket object associated with the express 4.0x server
  */
const handleRemoveConferenceWebSockets = async webSocket => {
	webSocket.on('msgRemoveConferenceFindRequest', async msg => {
		try {
			const conferenceRecord = await dbRetrievals.retrieveConferenceWithReferenceID(msg.id);
			webSocket.emit('msgRemoveConferenceFindResponse', conferenceRecord);
		} catch (err) {
			webSocket.emit('msgRemoveConferenceFindError', {});
			console.log(`[WebSockets][handleRemoveConferenceWebSockets]: ${err}`);
			throw err;
		}
	});

	webSocket.on('msgRemoveConferenceRemoveRequest', async msg => {
		try {
			if (credentials.validateCredentials(msg.username, msg.password)) {
				await dbRemovals.removeConferenceWithReferenceID(msg.id);
				webSocket.emit('msgRemoveConferenceRemoveResponse', {});
			} else {
				webSocket.emit('msgRemoveConferenceRemoveIncorrectCredentials', {});				
			}
		} catch (err) {
			webSocket.emit('msgRemoveConferenceRemoveError', {});
			console.log(`[WebSockets][handleRemoveConferenceWebSockets]: ${err}`);
			throw err;
		}
	});
};

module.exports = {
	handleRemoveConferenceWebSockets
};

