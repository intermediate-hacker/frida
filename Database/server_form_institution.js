/** @file Server side code form Institution related forms.
  * Used by server_form.js.
  * @author Muhammad Tirmazi
  */

const dbInserts = require('./db_inserts');
const credentials = require('./credentials');

const validateForm = (req, res) => {
	if (req.body.formInstitutionName.length === 0) {
		res.status(400).send(`You need to put in an Institution name! <a href="/">Back to home.</a>`);
		return false;
	} else if (req.body.formInstitutionCampus.length === 0) {
		res.status(400).send(`You need to put in an Institution campus! <a href="/">Back to home.</a>`);
		return false;
	} else {
		return true;
	}
};

/** Callback for handling submission of the "Add new institution" form.
  * @param {object} req An ExpressJS 4.0x request
  * @param {object} res An ExpressJS 4.0x response
  */
const handlerAddInstitution = async (req, res) => {
	if (credentials.validateCredentials(req.body.formUsername, req.body.formPassword) && validateForm(req, res)) {
		try {
			await dbInserts.insertInstitution(req.body.formInstitutionName, req.body.formInstitutionCampus);
			res.status(201).send(`Institution ${req.body.formInstitutionName} inserted. 
							Redirecting in 5 seconds. <a href="/contribute">Redirect now.</a>
							<meta http-equiv="refresh" content="5;url=/contribute"/>`);
		} catch (err) {
			console.log(`[server_form_paper][handlerAddInstitution]: ${err}`);
			res.status(401).send(`<b>Error</b>: Could not register institution.
								Redirecting in 5 seconds. <a href="/contribute">Redirect now.</a>
								<meta http-equiv="refresh" content="5;url=/contribute"/>`);			
		}
	} else {
		res.status(401).send(`Incorrect Credentials for ${req.body.formUsername}`);
	}
};

module.exports = { handlerAddInstitution };