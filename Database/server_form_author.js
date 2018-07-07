/** @file Server side code form Author related forms.
  * Used by server_form.js.
  * @author Muhammad Tirmazi
  */

const dbInserts = require('./db_inserts');
const credentials = require('./credentials');

const validateForm = (req, res) => {
	if (req.body.formAuthorFirstName.length === 0) {
		res.status(400).send(`You need to put in an author first name! <a href="/">Back to home.</a>`);
		return false;
	} else if (req.body.formAuthorLastName.length === 0) {
		res.status(400).send(`You need to put in an author last name! <a href="/">Back to home.</a>`);
		return false;
	} else if (req.body.formInstitutionList.length === 0) {
		res.status(400).send(`You need to put in an affiliated institution! <a href="/">Back to home.</a>`);
		return false;
	} else {
		return true;
	}
};

/** Callback for handling submission of the "Add new author" form.
  * @param {object} req An ExpressJS 4.0x request
  * @param {object} res An ExpressJS 4.0x response
  */
const handlerAddAuthor = async (req, res) => {
	if (credentials.validateCredentials(req.body.formUsername, req.body.formPassword) && validateForm(req, res)) {
		const authorID = await dbInserts.insertAuthor(req.body.formAuthorFirstName, req.body.formAuthorLastName);
		const tempArr = req.body.formInstitutionList.split(' ');
		const institutionID = tempArr[tempArr.length - 1];
		await dbInserts.setInstitutionOfAuthor(authorID, institutionID);
		res.status(201).send(`Author ${req.body.formAuthorLastName}, ${req.body.formAuthorFirstName} inserted to database. <a href="/">Back to home.</a>`);
	} else {
		res.status(401).send(`Incorrect Credentials for ${req.body.formUsername}`);
	}
};

module.exports = { handlerAddAuthor };