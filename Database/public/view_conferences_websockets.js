/** @file Client side code for sending websocket requests from the
  * view conferences page to the server and handling their responses.
  * @author Muhammad Tirmazi
  */

/** Sends web socket requests by the view conferences apge
  * and handles responses.
  */
const webSocketViewConferencesConnectRequests = () => {
	const webSocket = io();

	webSocket.on('msgViewConferenceResponse', conferenceList => {
		const elem = document.getElementById('idViewConferenceList');
		elem.innerHTML = '<ul class="list-group">';

		console.log(conferenceList);

		conferenceList.forEach(v => {
			elem.innerHTML += `<li class="list-group-item">
			<h6 class="text-success">${v.doc.title}</h6>
			${v.doc.venue} -
		    <small><time>${v.doc.date}</time></small><br>
		    <div class="text-secondary">Ref: ${v.id}</div>
			</li>`;
		});

		elem.innerHTML += '</ul>';		
	});

	webSocket.emit('msgViewConferenceRequest', {});
};