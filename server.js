var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	path = require('path'),
	router = require('./routes');

// static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/assets')));
app.use(express.static(path.join(__dirname, 'public/views')));

// routes
app.use('/', router);
app.use('/getAll', router);
app.use('/saveNew', router);

// models
var valuesModel = require('./models');


// db connection
mongoose.connect('mongodb://localhost/bitcoin', function (err, res) {
	if (err) throw err;
	console.log('Connected to db');
});


app.listen(3000, function () {
	console.log('Listening on port 3000');
});