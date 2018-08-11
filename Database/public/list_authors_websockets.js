/** @file Client side code for sending websocket requests from the
  * list authors page to the server (uses the same backend as the contribute page) 
  * and handling their responses.
  * @author Muhammad Tirmazi
  */

const socket = io();

/** Sends web socket requests by the list authors page
  * and handles responses.
  */
const webSocketListAuthorConnectRequests = () => {
	const webSocket = io();

	webSocket.on('msgAddPaperAuthorListResponse', authorsList => {
		authorsList.forEach(v => {
			document.getElementById('listAuthorTableBody').innerHTML += `<tr><td>${v.author.doc.firstName}</td><td>${v.author.doc.lastName}</td><td>${v.institution.name}</td><td>${v.institution.campus}</td></tr>`;
		});
	});

	webSocket.emit('msgAddPaperAuthorListRequest', {});

};