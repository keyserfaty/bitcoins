'use strict';

const 
	request = require('request'),
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
		err ? console.log(err) : console.log('Succesfully created values: ' + values + ' in db.');
		return;
	});	
}

// puts group of values in object
exports.getAllCoins = function () {
	let getAllPromise = new Promise(function (resolve, reject) {

		let coinsPaths = {
			cad: api.cad,
			usd: api.usd,
			clp: api.clp
		};

		let readAll = function (coinsPaths) {
			let promise = new Promise(function (resolve, reject) {

				let result = {};
				let mapPosition = _.size(coinsPaths);

				_.map(coinsPaths, function (path, key) {
					readUrl(path)
					.then(function (value) {
						mapPosition--;
						result[key] = value;

						mapPosition === 0 ? 
						resolve(result) : reject(err);
					});
				});	
			})

			return promise;
		}

		let readUrl = function (path) {
			let promise = new Promise(function (resolve, reject) {
				
				readValue(path)
				.then(function (value) {
					resolve(value);
				})
				.catch(function (err) {
					console.log(err);
				})

			});

			return promise;
		}

		// Executes promise
		readAll(coinsPaths)
		.then(function (result) {
			resolve(result);
		})
		.catch(function (err) {
			reject(err);
		});
	});

	return getAllPromise;
}

// reads content of an url and returns an string with result
function readValue (path) {
	let promise = new Promise(function (resolve, reject) {
		request(path, function (err, res, body) {
			err ? reject(err) : resolve(body);
			return;
		});
	});

	return promise;
}