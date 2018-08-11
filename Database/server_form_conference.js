/** @file Server side code form Conference related forms.
  * Used by server_form.js.
  * @author Muhammad Tirmazi
  */

const dbInserts = require('./db_inserts');
const credentials = require('./credentials');

const validateForm = (req, res) => {
	if (req.body.formConferenceTitle.length === 0) {
		res.status(400).send(`You need to put in a conference title! <a href="/">Back to home.</a>`);
		return false;
	} else if (req.body.formConferenceVenue.length === 0) {
		res.status(400).send(`You need to put in a conference venue! <a href="/">Back to home.</a>`);
		return false;
	} else if (req.body.formConferenceDate === undefined) {
		res.status(400).send(`You need to put in a starting date! <a href="/">Back to home.</a>`);
		return false;	
	} else {
		return true;
	}
};

/** Callback for handling submission of the "Add new conference" form.
  * @param {object} req An ExpressJS 4.0x request
  * @param {object} res An ExpressJS 4.0x response
  */
const handlerAddConference = async (req, res) => {
	if (credentials.validateCredentials(req.body.formUsername, req.body.formPassword) && validateForm(req, res)) {
		try {
			const conferenceID = await dbInserts.insertConference(req.body.formConferenceTitle, 
																	new Date(req.body.formConferenceDate),
																	req.body.formConferenceVenue,
																	req.body.formConferenceNotes);
			res.status(201).send(`
				Conference ${req.body.formConferenceTitle} inserted to database. 
				Redirecting in 5 seconds. <a href="/contribute">Redirect now.</a>
				<meta http-equiv="refresh" content="5;url=/add_conference"/>`);
		} catch (err) {
			console.log(`[server_form_conference][handlerAddConference]: ${err}`);
			res.status(401).send(`<b>Error</b>: Could not register conference.
					Redirecting in 5 seconds. <a href="/contribute">Redirect now.</a>
					<meta http-equiv="refresh" content="5;url=/contribute"/>`);
		}

	} else {
		res.status(401).send(`Incorrect Credentials for ${req.body.formUsername}`);
	}
};

module.exports = { handlerAddConference };