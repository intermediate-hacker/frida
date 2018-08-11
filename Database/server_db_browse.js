/** @file Server side code for browsing
  * the Couch-DB databases we set up and their current state.
  * @author Muhammad Tirmazi
  */

const dbRetrievals = require('./db_retrievals');

// const styleHeadHtml = `
// 		<head>
// 			<style>
// 				table {
// 				    font-family: arial, sans-serif;
// 				    border-collapse: collapse;
// 				    width: 100%;
// 				}

// 				td, th {
// 				    border: 1px solid #dddddd;
// 				    text-align: left;
// 				    padding: 8px;
// 				}

// 				tr:nth-child(even) {
// 				    background-color: #dddddd;
// 				}
// 			</style>
// 		</head>`;

/** Handles client request to view all registered authors.
  * Generates a page listing them all and sends that as a response.
  * @param {object} req An ExpressJS 4.0x request
  * @param {object} res An ExpressJS 4.0x response
  */
// const serverGenerateAllAuthorsPage = async (req, res) => {
// 	const authorList = await dbRetrievals.retreiveAllRegisteredAuthorsWithInstitutions();

// 	let responseString = styleHeadHtml + `
// 	<body>
// 	<h3>Registered Authors</h3>`;
// };

/** Handles client request to view all registered institutions.
  * Generates a page listing them all and sends that as a response.
  * @param {object} req An ExpressJS 4.0x request
  * @param {object} res An ExpressJS 4.0x response
  */
// const serverGenerateAllInstitutionsPage = async (req, res) => {
// 	const institutionList = await dbRetrievals.retrieveAllRegisteredInstitutions();

// 	let responseString = styleHeadHtml + `
// 		<body>
// 		<h3>Registered Institutions</h3>		
// 		<small><a href="/">Home</a> : <a href="javascript:window.close();">Close window</a></small>
// 		<br>
// 		<table>
// 		<tr><th>Name</th><th>Campus</th><th>Registration ID</th></tr>`;

// 	let num = 0;
// 	institutionList.rows.forEach(v => {
// 		num += 1;
// 		responseString += `<tr><td>${v.doc.name}</td><td>${v.doc.campus}</td>
// 			<td><input id="idInput${num}" type="text" value="${v.id}">
// 			<button onclick="let x = document.getElementById('idInput${num}'); x.select(); document.execCommand('copy');alert('Copied ID for ${v.doc.name}');">Copy</button>
// 			</td></tr>`;
// 	});

// 	responseString += '</table><small><a href="/">Home</a> : <a href="javascript:window.close();">Close window</a></small></body>';

// 	res.status(200).send(responseString);
// };

/** Adds database browsing handlers to the server
  * @param {object} expressApp the object associated with the ExpressJS 4.0x server
  */
// const serverAddDatabaseBrowseListeners = async expressApp => {
// 	expressApp.get('/list_institutions', (req, res) => {
// 		res.sendFile()
// 	});
// };

// module.exports = {
// 	serverAddDatabaseBrowseListeners
// };