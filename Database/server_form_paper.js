/** @file Server side code form Paper related forms.
  * Used by server_form.js.
  * @author Muhammad Tirmazi
  */

const dbInserts = require('./db_inserts');
const credentials = require('./credentials');

const validateForm = (req, res) => {
	if (req.body.formPaperTitle.length === 0) {
		res.status(400).send(`You need to put in a paper title! <a href="/">Back to home.</a>`);
		return false;
	} else if (req.body.formPaperCategoryName.length === 0) {
		res.status(400).send('You need to select a category! <a href="/">Back to home.</a>');
		return false;
	} else if (req.body.formAuthorNumber.length === 0) {
		res.status(400).send(`You need to put in an author number! <a href="/">Back to home.</a>`);
		return false;
	} else if (req.body.formPaperPublicationDate === undefined) {
		res.status(400).send(`You need to put in a publication date! <a href="/">Back to home.</a>`);
		return false;		
	} else if (req.body.formAttachFileRadios.length === 0) {
		res.status(400).send(`You need to put in an upload option! <a href="/">Back to home.</a>`);
		return false;		
	} else if (req.body.formAttachFileRadios === "addURL" && req.body.formFileURL.length === 0) {
		res.status(400).send(`You need to put in a paper URL! <a href="/">Back to home.</a>`);
		return false;
	} else if (req.body.formAttachFileRadios === "uploadFile" && !req.files) {
		res.status(400).send(`You need to upload a file! <a href="/">Back to home.</a>`);
		return false;
	// } else if (req.body.formAttachFileRadios === "addURL" && req.files) {
	// 	res.status(400).send(`Incorrect attachment method to input mapping! <a href="/">Back to home.</a>`);
		// return false;
	} else if (req.body.formAttachFileRadios === "uploadFile" && req.body.formFileURL.length !== 0) {
		res.status(400).send(`Incorrect attachment method to input mapping! <a href="/">Back to home.</a>`);
		return false;		
	} else {
		return true;
	}
};

/** Callback for handling submission of the "Add new author" form.
  * @param {object} req An ExpressJS 4.0x request
  * @param {object} res An ExpressJS 4.0x response
  */
const handlerAddPaper = async (req, res) => {
	if (credentials.validateCredentials(req.body.formUsername, req.body.formPassword) && validateForm(req, res)) {
		try {
			let url = req.body.formFileURL;

			if (req.body.formAttachFileRadios === "uploadFile") {
				const tmpLambda = () => new Promise((resolve, reject) => {
					let tempFile = req.files.formFileToUpload;
					tempFile.mv('./public/' + tempFile.name, async err => {
						if (err) {
							res.status(500).send(err);
							reject();
						} else {
							resolve(tempFile.name);
						}
					});
				});

				url = await tmpLambda();
			}

			const authorTokens = [];
			const authorNames = []

			for (let i = 1; i <= req.body.formAuthorNumber; i++) {
				authorNames.push(req.body[`formAuthorList${i}`]);
				req.body[`formAuthorList${i}`].split(' ').forEach(v => authorTokens.push(v));
			}

			let keywordList = [...req.body.formPaperTitle.split(' '), ...authorTokens];
			
			if (req.body.formPaperKeywords.length !== 0) {
				keywordList = [...req.body.formPaperKeywords.split(','), ...keywordList];
			}

			keywordList = keywordList.map(v => {
				return v.trim().toUpperCase();
			});

			const paperID = await dbInserts.insertPaper(
				req.body.formPaperTitle, 
				url, 
				authorNames, 
				new Date(req.body.formPaperPublicationDate),
				req.body.formPaperCategoryName,
				keywordList);
			res.status(201).send(`
				Paper ${req.body.formPaperTitle} inserted to database. 
				Redirecting in 5 seconds. <a href="/contribute">Redirect now.</a>
				<meta http-equiv="refresh" content="5;url=/contribute"/>`);
		} catch (err) {
			console.log(`[server_form_paper][handlerAddPaper]: ${err}`);
			res.status(401).send(`<b>Error</b>: Could not register paper.
					Redirecting in 5 seconds. <a href="/contribute">Redirect now.</a>
					<meta http-equiv="refresh" content="5;url=/contribute"/>`);
		}

	} else {
		res.status(401).send(`Incorrect Credentials for ${req.body.formUsername}`);
	}
};

module.exports = { handlerAddPaper };