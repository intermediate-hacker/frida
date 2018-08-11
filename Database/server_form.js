/** @file Server side code for form handling.
  * Bridges the front-end forms to the database managment system

  * @author Muhammad Tirmazi
  */

const bodyParser = require("body-parser");
const expressFileUpload = require('express-fileupload');

const paper = require('./server_form_paper');
const conference = require('./server_form_conference');

/** Adds form submission handlers to the server
  * @param {object} expressApp the object associated with the ExpressJS 4.0x server
  */
const serverAddFormListeners = async expressApp => {
	expressApp.use(bodyParser.urlencoded({ extended: false }));
	expressApp.use(bodyParser.json());
	expressApp.use(expressFileUpload());

	expressApp.post('/contribute', async (req, res) => await paper.handlerAddPaper(req, res));
	expressApp.post('/add_conference', async (req, res) => await conference.handlerAddConference(req, res));
};

module.exports = { serverAddFormListeners };