/** @file All database insert functions.
  * The database management system I am using is Apache CouchDB,
  * with the nano module as its NodeJS client.
  * @author Muhammad Tirmazi
  */

const bluebird = require('bluebird');
const nano = require('nano')('http://tirmazi:tirmazi@localhost:5984');
const crypto = require('crypto');

bluebird.promisifyAll(nano.db);

const getPromisifiedDB = (dbName) => {
	const db = nano.db.use(dbName);
	bluebird.promisifyAll(db);
	return db;
};

const destroyDatabases = async () => {
	await nano.db.destroyAsync('author');
	await nano.db.destroyAsync('institution');
}

const createDatabases = async () => {
	await nano.db.createAsync('author');
	await nano.db.createAsync('institution');
	await nano.db.createAsync('paper');
}

const recreateDatabases = async () => {
	try {
		await destroyDatabases();
		await createDatabases();
	} catch (err) {
		console.log(`[database][recreateDatabases]: ${err}`);
	}
}

/**
  * Adds a new author to the database.
  * @param {string} firstName The first name of the author.
  * @param {string} lastName The last name of the author.
  * @returns {string} identifier of the database record.
  */
const insertAuthor = async (firstName, lastName) => {
	const author = getPromisifiedDB('author');

	const sha1Hash = crypto.createHash('sha1').update(`${firstName}${lastName}`).digest('hex');

	try {
		const body = await author.insertAsync({ firstName : firstName, lastName : lastName }, sha1Hash);
		console.log(`[database][author.insert] ${sha1Hash} inserted:`);
		console.log(body);
		return sha1Hash;
	} catch (err) {
		console.log(`[database][author.insert]: ${err.message}`);
	}
};

/** 
  * Sets the institution of an (existing) author.
  * @param {string} authorID The identifier for the author (in the DB).
  * @param {string} institutionID The identifier for the institution (in the DB).
  */
const setInstitutionOfAuthor = async (authorID, institutionID) => {
	const author = getPromisifiedDB('author');
	const institution = getPromisifiedDB('institution');

	try {
		const authorDoc = await author.getAsync(authorID);
		const institutionDoc = await institution.getAsync(institutionID);

		authorDoc['institutionID'] = institutionID;

		const authorDocInserted = await author.insertAsync(authorDoc);
		console.log(`[database][setInstitutionOfAuthor]: ${authorDoc}`);

	} catch (err) {
		console.log(`[database][setInstitutionOfAuthor]: ${err}`);
	}
}

/**
  * Adds a new institution to the database.
  * @param {string} name The name of the institution.
  * @param {string} campus The location of the institution's campus being added.
  * @returns {string} identifier of the database record.
  */
const insertInstitution = async (name, campus) => {
	const institution = getPromisifiedDB('institution');

	const sha1Hash = crypto.createHash('sha1').update(`${name}${campus}`).digest('hex');

	try {
		const body = await institution.insertAsync({ name: name, campus: campus }, sha1Hash);
		console.log(`[database][institution.insert] ${sha1Hash} inserted`);
		console.log(body);
		return sha1Hash;
	} catch (err) {
		console.log(`[database][institution.insert]: ${err.message}`);
	}
};

/**
  * Adds a new paper to the database.
  * @param {string} title The title of the paper.
  * @param {string} url of the paper.
  * @param {string} authorID identifier (in DB) of the paper's author.
  * @param {Date} publicationDate the date on which the paper was published (in a journal etc.).
  */
const insertPaper = async (title, url, authorID, publicationDate) => {
	const paper = getPromisifiedDB('paper');

	const sha1Hash = crypto.createHash('sha1').update(`${title}${url}${authorID}`);

	try {
		const body = paper.insertAsync({ title: title, url: url, authorID: authorID, publicationDate: publicationDate.toString()});
		console.log(`[database][insertPaper]: ${sha1Hash} inserted`);
		console.log(body);
		return sha1Hash;
	} catch (err) {
		console.log(`[database][insertPaper]: ${err.message}`);
	}
};

const mainFunc = async () => {
	await recreateDatabases();
	const institutionID = await insertInstitution('Harvard', 'Main');
	// insertInstitution('University of California', 'Los Angeles');

	const authorID = await insertAuthor('Judith', 'Butler');
	await setInstitutionOfAuthor(authorID, institutionID);

	const paperID = await insertPaper('Frames of War: When is life grievable?', 'https://www.versobooks.com/books/2148-frames-of-war', authorID, new Date(2009));
}

mainFunc();