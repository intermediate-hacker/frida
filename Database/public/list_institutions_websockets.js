/** @file Client side code for sending websocket requests from the
  * list institutions page to the server (uses the same backend as the add author page) 
  * and handling their responses.
  * @author Muhammad Tirmazi
  */

const socket = io();

/** Sends web socket requests by the list institutions
  * and handles responses.
  */
const webSocketListInstitutionConnectRequests = () => {
	const webSocket = io();

	webSocket.on('msgAddAuthorInstitutionListResponse', institutionList => {
		institutionList.rows.forEach(v => {
			document.getElementById('listInstitutionTableBody').innerHTML += `<tr><td>${v.doc.name}</td><td>${v.doc.campus}</td></tr>`;
		})
	});

	webSocket.emit('msgAddAuthorInstitutionListRequest', {});

};