/** @file Server side code for handling
  * web socket requests sent by the remove paper page.
  * @author Muhammad Tirmazi
  */

const dbRetrievals = require('./db_retrievals');
const dbRemovals = require('./db_removals');
const credentials = require('./credentials');

/** Handles websocket requests sent by the remove paper
  * page. 
  * @param {object} webSocket The socket.io websocket object associated with the express 4.0x server
  */
const handleRemovePaperWebSockets = async webSocket => {
	webSocket.on('msgRemovePaperFindRequest', async msg => {
		try {
			const paperRecord = await dbRetrievals.retrievePaperWithReferenceID(msg.id);
			webSocket.emit('msgRemovePaperFindResponse', paperRecord);
		} catch (err) {
			webSocket.emit('msgRemovePaperFindError', {});
			console.log(`[WebSockets][handleRemovePaperWebSockets]: ${err}`);
			throw err;
		}
	});

	webSocket.on('msgRemovePaperRemoveRequest', async msg => {
		try {
			if (credentials.validateCredentials(msg.username, msg.password)) {
				await dbRemovals.removePaperWithReferenceID(msg.id);
				webSocket.emit('msgRemovePaperRemoveResponse', {});
			} else {
				webSocket.emit('msgRemovePaperRemoveIncorrectCredentials', {});	
			}
		} catch (err) {
			webSocket.emit('msgRemovePaperRemoveError', {});
			console.log(`[WebSockets][handleRemovePaperWebSockets]: ${err}`);
			throw err;
		}
	});
};

module.exports = {
	handleRemovePaperWebSockets
};

