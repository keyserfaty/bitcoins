var	request = require('request'),
	Q = require('q'),
	_ = require('underscore'),
	config = require('./config');

// turns group of strings into object
exports.saveValuesToObject = function (callback) {

	var coinsPaths = {
		cad: config.cad,
		usd: config.usd,
		clp: config.clp
	};

	var readUrl = function (path) {
		var deferred = Q.defer();
		readValue(path, function (err, value) {
			if (err) deferred.reject(err);

			else deferred.resolve(value);
		});
		return deferred.promise;
	}

	var readAll = function (coinsPaths) {
		var deferred = Q.defer();
		
		var result = {};
		var mapPosition = _.size(coinsPaths);

		_.map(coinsPaths, function (path, key) {
			readUrl(path).then(function (value) {
				mapPosition--;
				result[key] = value;

				if (mapPosition === 0) {
					deferred.resolve(result);
				}

			}, function (err) {
				if (err) deferred.reject(err);
			});
		});

		return deferred.promise;
	}

	return readAll(coinsPaths).then(function (result) {
		return callback(null, result);
	});
}

// reads content of an url and returns an string with result
function readValue (path, callback) {
	request(path, function (err, res, body) {
		if (err) return callback(err);

		return callback(null, body);
	});
}