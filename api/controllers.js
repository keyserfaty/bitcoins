'use strict';

const path = require('path'),
	valuesModel = require('./models');

exports.getAll = function (req, res) {
	valuesModel.find().limit(1).sort({time: -1}).exec(function (err, values) {
		if (err) { console.log(err); return; };
		res.send(values).end();
		return;
	});
}

exports.useAngular = function (req, res) {
	res.sendFile(path.join(__dirname, 'public/views/index.html'));
	return;
}