/** @file Client side code for sending websocket requests from the
  * add paper page to the server and handling their responses.
  * @author Muhammad Tirmazi
  */

const socket = io();

/** Sends web socket requests by the add paper form 
  * and handles responses.
  */
const webSocketContributeConnectRequests = () => {
	const webSocket = io();

	webSocket.on('msgAddPaperAuthorListResponse', authorList => {
		authorList.forEach(v => {
			document.getElementById('formAuthorDataList').innerHTML += `<option value="${v.author.doc.lastName}, ${v.author.doc.firstName} (${v.institution.name}, ${v.institution.campus}) - ${v.author.id}">`;
		});
	});

	webSocket.emit('msgAddPaperAuthorListRequest', {});

};