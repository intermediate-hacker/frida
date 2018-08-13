/** @file Client side code for sending websocket requests from the
  * remove conference page to the server and handling their responses.
  * @author Muhammad Tirmazi
  */
const webSocket = io();

let conferenceToRemove = '';

/** Initialized web socket handles for remove conference page 
  */
const webSocketRemoveConferenceConnect = () => {
	webSocket.on('msgRemoveConferenceFindResponse', v => {
		const elem = document.getElementById('idRemoveConferenceCardBody');
		conferenceToRemove = v._id;
		document.getElementById('idRemoveConferenceButton').disabled = false;

		elem.innerHTML = `
			<h6 class="text-success">${v.title}</h6>
			${v.venue} -
		    <small><time>${v.date}</time></small><br>
		    <div class="text-secondary">Ref: ${v._id}</div>`;

	});

	webSocket.on('msgRemoveConferenceFindError', msg => {
		const elem = document.getElementById('idRemoveConferenceCardBody');
		elem.innerHTML = 'Could not find conference! Try another reference id.';
	});

	webSocket.on('msgRemoveConferenceRemoveResponse', v => {
		document.getElementById('idRemoveConferenceCardBody').innerHTML = `
		<center><h6 class="text-success">Conference Removed!</h6></center>`;
	});

	webSocket.on('msgRemoveConferenceRemoveError', v => {
		document.getElementById('idRemoveConferenceCardBody').innerHTML = `
		<center><h6 class="text-failure">Could not remove conference!</h6></center>`;
	});

	webSocket.on('msgRemoveConferenceRemoveIncorrectCredentials', v => {
		document.getElementById('idRemoveConferenceCardBody').innerHTML = `
		<center><h6 class="text-failure">Could not remove conference! Incorrect Credentials.</h6></center>`;
	});
};

const webSocketRemoveConferenceRemove = () => {
	document.getElementById('idRemoveConferenceButton').disabled = true;		
	webSocket.emit('msgRemoveConferenceRemoveRequest', 
		{
			id: conferenceToRemove,
			username: document.getElementById('idUsernameInput').value.trim(),
		  	password: document.getElementById('idPasswordInput').value.trim()
		});
}

/** Sends web socket requests by the remove conference page
  * and handles responses.
  */
const webSocketRemoveConferenceFind = () => {
	document.getElementById('idRemoveConferenceButton').disabled = true;	
	webSocket.emit('msgRemoveConferenceFindRequest', { id: document.getElementById('idReferenceNumberInput').value.trim() });
};