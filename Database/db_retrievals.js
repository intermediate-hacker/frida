/** @file All database retrieval functions.
  * The database management system I am using is Apache CouchDB,
  * with the nano module as its NodeJS client.
  * @author Muhammad Tirmazi
  */

const nano = require('nano')('http://tirmazi:tirmazi@localhost:5984');
const bluebird = require('bluebird');

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
	}
};


const testModule = async () => {
	const list = await retrieveFiveRecentPapers();
	list.forEach(v => console.log(v));
};

// testModule();