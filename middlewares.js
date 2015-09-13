var config = require('./config'),
	request = require('request');

// turns group of strings into object
exports.saveValuesToObject = function (callback) {
	var result = {};

	var coinsPaths = {
		cad: config.cad,
		usd: config.usd,
		cpl: config.cpl
	};


	for (coin in coinsPaths) {
		readValues(coinsPaths[coin], function (err, value) {
			// este console.log de acá
			console.log(coin);
			if (err) return callback(err);

			result[coin] = value;
		});
	};

	return callback(null, result);

}

// reads content of an url and returns an string with result
function readValues (path, callback) {
	request(path, function (err, res, body) {
		if (err) return callback(err);

		return callback(null, body);
	});
}