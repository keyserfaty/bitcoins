var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	path = require('path'),
	router = require('./routes');

// static files
app.use(express.static(path.join(__dirname, 'views')));

// routes
app.use('/', router);
app.use('/refresh', router);

// models




// db connection
mongoose.connect('mongodb://localhost/bitcoin', function (err, res) {
	if (err) throw err;
	console.log('Connected to db');
});


app.listen(3000, function () {
	console.log('Listening on port 3000');
});