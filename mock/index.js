module.exports = function(app) {

	// get
	app.get('/test', function(req, res) {
		res.json([1, 2, 3, 4]);
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
