/** @file All database insert functions.
  * The database management system I am using is Apache CouchDB,
  * with the nano module as its NodeJS client.
  * @author Muhammad Tirmazi
  */

const bluebird = require('bluebird');
const nano = require('nano')('http://tirmazi:tirmazi@localhost:5984');
const crypto = require('crypto');

bluebird.promisifyAll(nano.db);


/** @param {string} dbName The name of a database
  * @returns {object} A promisified version of the database (via bluebird)
  */
const getPromisifiedDB = (dbName) => {
	const db = nano.db.use(dbName);
	bluebird.promisifyAll(db);
	return db;
};


/** Destroys 4 databases: author, institution, paper, and conference.
  */
const destroyDatabases = async () => {
	await nano.db.destroyAsync('paper');
	await nano.db.destroyAsync('conference');
};

/** Creates 4 databases: author, institution, paper, and conference.
  */
const createDatabases = async () => {
	// await nano.db.createAsync('author');
	// await nano.db.createAsync('institution');
	await nano.db.createAsync('paper');
	await nano.db.createAsync('conference');

	const paper = getPromisifiedDB('paper');
	await paper.insertAsync({
		queue : []
	}, 'recent');

	const conference = getPromisifiedDB('conference');
	await conference.insertAsync({
		queue : []
	}, 'recent');
};

const recreateDatabases = async () => {
	try {
		await destroyDatabases();
		await createDatabases();
	} catch (err) {
		console.log(`[database][recreateDatabases]: ${err}`);
	}
};

/**
  * Adds a new paper to the database.
  * @param {string} title The title of the paper.
  * @param {string} url of the paper.
  * @param {string} authorIDList list of identifiers (in DB) of the paper's authors.
  * @param {Date} publicationDate the date on which the paper was published (in a journal etc.).
  * @param {List} keywords list of keywords (strings) to be used when searching for your paper.
  * @returns {string} identifier of the database record.
  */
const insertPaper = async (title, url, authorNameList, publicationDate, categoryName, keywords) => {
	const paper = getPromisifiedDB('paper');

	const sha1Hash = crypto.createHash('sha1').update(`${title}${url}${authorNameList}`).digest('hex');

	try {
		const body = await paper.insertAsync({ 
			title: title, 
			url: url, 
			authorNameList: authorNameList, 
			publicationDate: publicationDate.toString(),
			categoryName : categoryName,
			keywords: keywords
		}, sha1Hash);

		console.log(`[database][insertPaper]: ${sha1Hash} inserted`);
		
		const recentPapersDoc = await paper.getAsync('recent');
		recentPapersDoc['queue'].push(sha1Hash);

		if (recentPapersDoc['queue'].length > 5) {
			recentPapersDoc['queue'].splice(0, 1);
		}

		await paper.insertAsync(recentPapersDoc);

		return sha1Hash;
	} catch (err) {
		console.log(`[database][insertPaper]: ${err.message}`);
		throw new Error();
	}
};

/**
  * Adds a new conference to the database.
  * @param {string} title The title of the paper.
  * @param {Date} date the date the conference will be held.
  * @param {string} venue The place the conference will be held.
  * @param {string} notes Any notes on the conference.
  * @returns {string} identifier of the database record.
  */
const insertConference = async (title, date, venue, notes) => {
	const conference = getPromisifiedDB('conference');
	let dateString = date.toString();
	const sha1Hash = crypto.createHash('sha1').update(`${title}${venue}${dateString}`).digest('hex');

	try {
		const body = await conference.insertAsync({
			title: title,
			date: dateString,
			venue: venue,
			notes: notes
		}, sha1Hash);

		console.log(`[database][insertConference]: ${sha1Hash} inserted`);

		const recentConferencesDoc = await conference.getAsync('recent');
		recentConferencesDoc['queue'].push(sha1Hash);

		if (recentConferencesDoc['queue'].length > 5) {
			recentConferencesDoc['queue'].splice(0, 1);
		}

		await conference.insertAsync(recentConferencesDoc);		

		return sha1Hash;
	} catch (err) {
		console.log(`[database][insertConference]: ${err.message}`);
		throw new Error();
	}
};

const mainFunc = async () => {
	await recreateDatabases();
};

module.exports = { 
	getPromisifiedDB,
	insertPaper,
	insertConference
};

// mainFunc();