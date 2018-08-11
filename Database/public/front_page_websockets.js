/** @file Client side code for sending websocket requests from the
  * front page to the server and handling their responses.
  * @author Muhammad Tirmazi
  */

/** Sends web socket requests by the front page
  * and handles responses.
  */
const webSocketFrontPageConnectRequests = () => {
	const webSocket = io();

	webSocket.on('msgRecentPaperResponse', paperList => {
		const elem = document.getElementById('idRecentPapersCardBody');
		elem.innerHTML = '<ul class="list-group">';

		paperList.forEach(v => {
			const authorListGen = v.authorNameList.map(v => `${v}`).join(', ');
			elem.innerHTML += `<li class="list-group-item">
			<a href="${v.url}" target="_blank">${v.title}</a><br>
			Author(s): ${authorListGen}<br>
			<div class="text-secondary">Ref: ${v._id}</div></li>`;
		});

		elem.innerHTML += '</ul>';
	});

	webSocket.on('msgRecentConferencesResponse', conferenceList => {
		const elem = document.getElementById('idRecentConferencesCardBody');
		elem.innerHTML = '<ul class="list-group">';

		conferenceList.forEach(v => {
			elem.innerHTML += `<li class="list-group-item">
			<h6 class="text-success">${v.title}</h6>
			${v.venue} -
		    <small><time>${v.date}</time></small><br>
		    <div class="text-secondary">Ref: ${v._id}</div>
			</li>`;
		});

		elem.innerHTML += '</ul>';		
	});

	webSocket.emit('msgRecentPaperRequest', {});
	webSocket.emit('msgRecentConferencesRequest', {});

};