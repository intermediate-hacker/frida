/** @file Server side code for routing all main webpages
  * @author Muhammad Tirmazi
  */

/** Adds routes to the express 4.0x server
  * according to the sitemap.
  * @param {object} expressApp The object associated with the express 4.0x server
  * @returns {}
  */
const serverRoutePages = expressApp => {
	expressApp.get('/', (req, res) => {
		res.sendFile(__dirname + '/index.html');
	});

	expressApp.get('/contribute', (req, res) => {
		res.sendFile(__dirname + '/contribute.html');
	});

	expressApp.get('/add_conference', (req, res) => {
		res.sendFile(__dirname + '/add_conference.html');
	});

	expressApp.get('/remove_conference', (req, res) => {
		res.sendFile(__dirname + '/remove_conference.html');
	});

	expressApp.get('/remove_paper', (req, res) => {
		res.sendFile(__dirname + '/remove_paper.html');
	});

	expressApp.get('/refined_search', (req, res) => {
		res.sendFile(__dirname + '/refined_search.html');
	});

	expressApp.get('/view_conferences', (req, res) => {
		res.sendFile(__dirname + '/view_conferences.html');
	})

	expressApp.get('/contact', (req, res) => {
		res.sendFile(__dirname + '/contact.html');
	});

	expressApp.get('/add_author', (req, res) => {
		res.sendFile(__dirname + '/add_author.html');
	});

	expressApp.get('/add_institution', (req, res) => {
		res.sendFile(__dirname + '/add_institution.html');
	});

	expressApp.get('/list_institutions', (req, res) => {
		res.sendFile(__dirname + '/list_institutions.html');
	});

	expressApp.get('/list_authors', (req, res) => {
		res.sendFile(__dirname + '/list_authors.html');
	});

	expressApp.get('/about', (req, res) => {
		res.sendFile(__dirname + '/about.html');
	});

	expressApp.get('/search', (req, res) => {
		res.sendFile(__dirname + '/search.html');
	});
};

module.exports = {
	serverRoutePages
};