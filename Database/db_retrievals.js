/** @file All database retrieval functions.
  * The database management system I am using is Apache CouchDB,
  * with the nano module as its NodeJS client.
  * @author Muhammad Tirmazi
  */

const nano = require('nano')('http://tirmazi:tirmazi@localhost:5984');
const bluebird = require('bluebird');
const underscore = require('underscore');

bluebird.promisifyAll(nano.db);

const db_inserts = require('./db_inserts');


/** Retrieves the five most recently uploaded paper records (from the DB).
  * @returns {list} A list of the (at most) 5 records.
  */
const retrieveFiveRecentPapers = async () => {
	const paper = db_inserts.getPromisifiedDB('paper');

	try {
		const recentPapersDoc = await paper.getAsync('recent');
		const recentPapersList = await Promise.all(recentPapersDoc.queue.map(v => paper.getAsync(v)));
		return recentPapersList;
	} catch (err) {
		console.log(`[database][retrieveFiveRecentPapers]: ${err}`);
		throw err;
	}
};

/** Retrieves the five most recently uploaded conference records (from the DB).
  * @returns {list} A list of (at most) 5 records.
  */
const retrieveFiveRecentConferences = async () => {
	const conference = db_inserts.getPromisifiedDB('conference');

	try {
		const recentConferencesDoc = await conference.getAsync('recent');
		const recentConferencesList = await Promise.all(recentConferencesDoc.queue.map(v => conference.getAsync(v)));
		return recentConferencesList;
	} catch (err) {
		console.log(`[database][retrieveFiveRecentConferences]: ${err}`);
		throw err;
	}
};

const retrieveAllRegisteredConferences = async () => {
	const conference = db_inserts.getPromisifiedDB('conference');

	try {
		const conferenceList = await conference.listAsync({include_docs: true});
		const formattedConferenceList = underscore.filter(conferenceList.rows, v => (v.id !== 'recent'));
		return formattedConferenceList;
	} catch(err) {
		console.log(`[database][retrieveAllRegisteredConferences]: ${err}`);
		throw err;
	}
};


const retrieveConferenceWithReferenceID = async id => {
	const conference = db_inserts.getPromisifiedDB('conference');

	try {
		const conferenceRecord = await conference.getAsync(id);
		return conferenceRecord;
	} catch (err) {
		console.log(`[database][retrieveConferenceWithReferenceID]: ${err}`);
		throw err;
	}
};


const retrievePaperWithReferenceID = async id => {
	const paper = db_inserts.getPromisifiedDB('paper');

	try {
		const paperRecord = await paper.getAsync(id);
		return paperRecord;
	} catch (err) {
		console.log(`[database][retrievePaperWithReferenceID]: ${err}`);
		throw err;
	}
};

module.exports = {
	retrieveFiveRecentPapers,
	retrieveFiveRecentConferences,
	retrieveAllRegisteredConferences,
	retrieveConferenceWithReferenceID,
	retrievePaperWithReferenceID
};