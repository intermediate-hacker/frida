/** @file Client side code for sending websocket requests from the
  * refined search page to the server and handling their responses.
  * @author Muhammad Tirmazi
  */

const webSocketDoRefinedSearch = () => {
	document.getElementById('idSearchPapersCardBody').innerHTML = `<img src="content_loading_animation.gif"></img>`;

	categoryList = [];

	if (document.getElementById('idGenderAndHumanRightsCheckBox').checked) {
		categoryList.push('gender_and_human_rights');
	}

	if (document.getElementById('idGenderedViolenceCheckBox').checked) {
		categoryList.push('gendered_violence');
	}

	if (document.getElementById('idGenderedAndDevelopmentCheckBox').checked) {
		categoryList.push('gender_and_development');
	}

	if (document.getElementById('idGenderInequalitiesCheckBox').checked) {
		categoryList.push('gender_inequalities');
	}

	webSocket.emit('msgSearchRefinedRequest', { term: document.getElementById('idSearchInput').value, categoryList: categoryList });
};