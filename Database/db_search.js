/** @file All database search functions.
  * The database management system I am using is Apache CouchDB,
  * with the nano module as its NodeJS client.
  * @author Muhammad Tirmazi
  */

const nano = require('nano')('http://tirmazi:tirmazi@localhost:5984');
const bluebird = require('bluebird');
const underscore = require('underscore');

bluebird.promisifyAll(nano.db);

const db_inserts = require('./db_inserts');

/** Simple keyword intersection search function
  * @param {string} searchTerm the search term (possibly entered by a user)
  * @returns {list} list of papers sorted in descending order in terms of relevance to search term
  */
const searchBasic = async searchTerm => {
	try {
		let keywords = searchTerm.split(' ');
		keywords = keywords.map(v => v.trim().toUpperCase());

		const paperDB = db_inserts.getPromisifiedDB('paper');
		const paperList = await paperDB.listAsync({include_docs: true});

		const paperListWithRank = underscore.filter(paperList.rows, v => v.id !== 'recent').map(v => {
			console.log(v.doc.keywords);
			console.log(keywords);
			v.rank = underscore.intersection(v.doc.keywords, keywords).length;
			return v;
		}).filter(v => (v.rank > 0));

		// console.log(paperListWithRank);

		const paperListSorted = underscore.sortBy(paperListWithRank, v => -1 * v.rank);

		// console.log(paperListSorted);
		return paperListSorted;
	} catch (err) {
		console.log(`[database][searchBasic]: ${err}`);
		throw err;
	}
};

const searchRefined = async msg => {
	try {
		const paperListSorted = await searchBasic(msg.term);
		const paperListFiltered = underscore.filter(paperListSorted, v => (msg.categoryList.includes(v.doc.categoryName)));
		return paperListFiltered;
	} catch (err) {
		console.log(`[database][searchRefined]: ${err}`);
		throw err;
	}
};

module.exports = {
	searchBasic,
	searchRefined
};