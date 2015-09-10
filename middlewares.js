var config = require('./config'),
	request = require('request');

// turns group of strings into object
exports.saveValuesToObject = function (cad, usd, cpl, callback) {
	var result = {};

	var coinsPaths = {
		cad: config.cad,
		usd: config.usd,
		cpl: config.cpl
	};

	// como loopeo un objeto?
	coinsPaths.forEach(function (path) {
		readValues(path, function (err, value) {
			if (err) return err;

			// como agarro la key del objeto?
			result.[coinsPaths[path].key()] = value;
		});
	});

	return callback(null, result);
}

// reads content of an url and returns an string with result
exports.readValues = function (path, callback) {
	request(path, function (err, res, body) {
		if (err) return callback(err);

		return callback(null, body);
	});
}