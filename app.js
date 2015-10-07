'use strict';

const express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	path = require('path'),
	router = require('./api/routes'),
	job = require('./api/job');

// static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public/libs')));
app.use(express.static(path.join(__dirname, 'public/js')));
app.use(express.static(path.join(__dirname, 'public/views')));
app.use(express.static(path.join(__dirname, 'src')));

// routes
app.use('/', router);
app.use('/getAll', router);

// models
const valuesModel = require('./api/models');

// db connection
mongoose.connect('mongodb://localhost/bitcoin', function (err, res) {
	if (err) throw err;
	console.log('Connected to db');
});

app.listen(8080, function () {
	console.log('Listening on port 8080');
});