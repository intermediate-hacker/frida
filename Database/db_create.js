const nano = require('nano')('http://tirmazi:tirmazi@localhost:5984');

nano.db.create('author', () => {
	console.log('[database] author database created.');
});

// nano.db.create('institution', () => {
// 	console.log('[database] institution database created.');
// });