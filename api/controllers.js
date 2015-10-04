'use strict';

const path = require('path'),
	valuesModel = require('./models');

exports.getAll = function (req, res) {
	valuesModel.find().limit(1).sort({time: -1}).exec(function (err, values) {
		if (err) return err;
		res.send(values).end();
	});
}

exports.useAngular = function (req, res) {
	res.sendFile(path.join(__dirname, 'public/views/index.html'));
}