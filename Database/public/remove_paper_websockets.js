/** @file Client side code for sending websocket requests from the
  * remove paper page to the server and handling their responses.
  * @author Muhammad Tirmazi
  */
const webSocket = io();

let paperToRemove = '';

/** Initialized web socket handles for remove paper page 
  */
const webSocketRemovePaperConnect = () => {
	webSocket.on('msgRemovePaperFindResponse', v => {
		const elem = document.getElementById('idRemovePaperCardBody');
		const authorListGen = v.authorNameList.map(a => `${a}`).join(', ');

		paperToRemove = v._id;
		document.getElementById('idRemovePaperButton').disabled = false;

		elem.innerHTML = `
		<a href="${v.url}" target="_blank">${v.title}</a><br>
		Author(s): ${authorListGen}<br>
		<div class="text-secondary">Ref: ${v._id}</div></li>`;

	});

	webSocket.on('msgRemovePaperFindError', msg => {
		const elem = document.getElementById('idRemovePaperCardBody');
		elem.innerHTML = 'Could not find paper! Try another reference id.';
	});

	webSocket.on('msgRemovePaperRemoveResponse', v => {
		document.getElementById('idRemovePaperCardBody').innerHTML = `
		<center><h6 class="text-success">Paper Removed!</h6></center>`;
	});

	webSocket.on('msgRemovePaperRemoveError', v => {
		document.getElementById('idRemovePaperCardBody').innerHTML = `
		<center><h6 class="text-failure">Could not remove paper!</h6></center>`;
	});

	webSocket.on('msgRemovePaperRemoveIncorrectCredentials', v => {
		document.getElementById('idRemovePaperCardBody').innerHTML = `
		<center><h6 class="text-failure">Could not remove paper! Incorrect Credentials.</h6></center>`;
	});
};

const webSocketRemovePaperRemove = () => {
	document.getElementById('idRemovePaperButton').disabled = true;		
	webSocket.emit('msgRemovePaperRemoveRequest', 
		{
			id: paperToRemove,
			username: document.getElementById('idUsernameInput').value.trim(),
		  	password: document.getElementById('idPasswordInput').value.trim()
		});
}

/** Sends web socket requests by the remove paper page
  * and handles responses.
  */
const webSocketRemovePaperFind = () => {
	document.getElementById('idRemovePaperButton').disabled = true;	
	webSocket.emit('msgRemovePaperFindRequest', 
		{ 
			id: document.getElementById('idReferenceNumberInput').value.trim(),
		});
};