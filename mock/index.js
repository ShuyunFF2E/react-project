module.exports = function(app) {

	// get
	app.get('/home/content', function(req, res) {
		res.json('React framework front-end project template');
	});

	// post
	app.post('/test', function(req, res) {
		res.json({
			id: 12,
			other: '...'
		})
	});

	// ...
}
