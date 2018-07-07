/** @file Client side code for sending websocket requests from the
  * add author page to the server and handling their responses.
  * @author Muhammad Tirmazi
  */

const socket = io();

/** Sends web socket requests by the add author form 
  * and handles responses.
  */
const webSocketAddAuthorConnectRequests = () => {
	const webSocket = io();

	webSocket.on('msgAddAuthorInstitutionListResponse', institutionList => {
		institutionList.rows.forEach(v => {
			document.getElementById('formInstitutionDataList').innerHTML += `<option value="${v.doc.name} (${v.doc.campus}) - ${v.id}">`;
		})
	});

	webSocket.emit('msgAddAuthorInstitutionListRequest', {});

};