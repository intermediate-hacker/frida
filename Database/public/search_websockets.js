/** @file Client side code for sending websocket requests from the
  * seqrch page to the server and handling their responses.
  * @author Muhammad Tirmazi
  */

const webSocket = io();

/** Sends web socket requests by the search page
  * and handles responses.
  */
const webSocketSearchRequests = () => {
	webSocket.on('msgSearchBasicResponse', paperList => {
		const elem = document.getElementById('idSearchPapersCardBody');
		elem.innerHTML = '<ul class="list-group">';

		paperList.forEach(v => {
			const authorListGen = v.doc.authorNameList.map(v => `${v}`).join(', ');
			elem.innerHTML += `<li class="list-group-item">
								<a href="${v.doc.url}" target="_blank">${v.doc.title}</a><br>
								Author(s): 
								${authorListGen}<br>
								<div class="text-secondary">Ref: ${v.doc._id}</div>
							   </li>`;
		});

		elem.innerHTML += '</ul>';
	});
};

const webSocketDoSearch = () => {
	document.getElementById('idSearchPapersCardBody').innerHTML = `<img src="content_loading_animation.gif"></img>`;
	webSocket.emit('msgSearchBasicRequest', document.getElementById('idSearchInput').value);
};