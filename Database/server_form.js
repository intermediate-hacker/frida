/** @file Server side code for form handling.
  * Bridges the front-end forms to the database managment system

  * @author Muhammad Tirmazi
  */

const bodyParser = require("body-parser");

const institution = require('./server_form_institution');
const author = require('./server_form_author');

/** Adds form submission handlers to the server
  * @param {object} expressApp the object associated with the ExpressJS 4.0x server
  */
const serverAddFormListeners = async expressApp => {
	expressApp.use(bodyParser.urlencoded({ extended: false }));
	expressApp.use(bodyParser.json());

	expressApp.post('/add_institution', async (req, res) => await institution.handlerAddInstitution(req, res));
	expressApp.post('/add_author', async (req, res) => await author.handlerAddAuthor(req, res));
};

module.exports = { serverAddFormListeners };