/** @file Server side code for routing all main webpages
  * @author Muhammad Tirmazi
  */

const serverRoutePages = expressApp => {
	expressApp.get('/', (req, res) => {
		res.sendFile(__dirname + '/index.html');
	});

	expressApp.get('/contribute', (req, res) => {
		res.sendFile(__dirname + '/contribute.html');
	});

	expressApp.get('/add_author', (req, res) => {
		res.sendFile(__dirname + '/add_author.html');
	});

	expressApp.get('/add_institution', (req, res) => {
		res.sendFile(__dirname + '/add_institution.html');
	});
};

module.exports = {
	serverRoutePages
};