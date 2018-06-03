const nano = require('nano')('http://tirmazi:tirmazi@localhost:5984');

nano.db.destroy('chicken', () => {
	nano.db.create('chicken', () => {
		const chicken = nano.use('chicken');

		chicken.insert({ egg : true }, 'watson', (err, body, header) => {
			if (err) {
				console.log('[chicken.insert]', err.message);
				return;
			}

			console.log('You have inserted watson into chicken');
			console.log(body);
		});
	});
});