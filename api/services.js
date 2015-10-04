'use strict';

const request = require('request'),
	Q = require('q'),
	_ = require('underscore'),
	valuesModel = require('./models'),
	api = require('./api');

// saves values in db
exports.saveToDatabase = function (obj) {
	valuesModel.create({
		CAD: obj.cad,
		USD: obj.usd,
		CLP: obj.clp
		
	}, function (err, values) {
		if (err) return err;
		
		console.log('Succesfully created values: ' + values + ' in db.');
	});	
}

// puts group of values in object
exports.getAllCoins = function (callback) {
	let coinsPaths = {
		cad: api.cad,
		usd: api.usd,
		clp: api.clp
	};

	let readUrl = function (path) {
		let deferred = Q.defer();
		readValue(path, function (err, value) {
			if (err) deferred.reject(err);

			else deferred.resolve(value);
		});
		return deferred.promise;
	}

	let readAll = function (coinsPaths) {
		let deferred = Q.defer();
		
		let result = {};
		let mapPosition = _.size(coinsPaths);

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