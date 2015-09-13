var config = require('./config'),
	request = require('request'),
	Q = require('q'),
	_ = require('underscore');

// turns group of strings into object
exports.saveValuesToObject = function (callback) {
	var result = [];

	var coinsPaths = {
		cad: config.cad,
		usd: config.usd,
		clp: config.clp
	};

	var getValue = function(path, coin, i) {
		var q = Q.defer();
		readValues(path, function (err, value) {
			var res = {};
			res[coin] = value;
			q.resolve(res);
		});
		return q.promise;
	};

	var getAllValues = function() {
		var q = Q.defer(),
		pathsLength = _.size(coinsPaths),
		allRes = [],
		i = 1;
		
		for (var coin in coinsPaths) {
			path = coinsPaths[coin];
			var result = [];
			getValue(path, coin, i).then(function(res){
				result.push(res);
				if (i == pathsLength) {
					// Cuando recorrio todo el objeto, resuelvo la promise
					q.resolve(result);
				}
				i++;
			});
		}
		return q.promise;
	};

	getAllValues().then(function(result){
		return callback(null, result);
	});
	
	
}

// reads content of an url and returns an string with result
function readValues (path, callback) {
	request(path, function (err, res, body) {
		if (err) return callback(err);

		return callback(null, body);
	});
}