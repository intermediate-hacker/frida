/** @file All database removal functions.
  * The database management system I am using is Apache CouchDB,
  * with the nano module as its NodeJS client.
  * @author Muhammad Tirmazi
  */

const nano = require('nano')('http://tirmazi:tirmazi@localhost:5984');
const bluebird = require('bluebird');
const underscore = require('underscore');

bluebird.promisifyAll(nano.db);

const db_inserts = require('./db_inserts');

const removePaperWithReferenceID = async id => {
	const paper = db_inserts.getPromisifiedDB('paper');

	try {
		const paperRecord = await paper.getAsync(id);
		await paper.destroy(paperRecord._id, paperRecord._rev);

		const recentPapersDoc = await paper.getAsync('recent');
		recentPapersDoc['queue'] = underscore.filter(recentPapersDoc['queue'], v => (v !== id));
		await paper.insertAsync(recentPapersDoc);

	} catch (err) {
		console.log(`[database][removePaperWithReferenceID]: ${err}`);
		throw err;
	}
};

module.exports = {
	removePaperWithReferenceID
};