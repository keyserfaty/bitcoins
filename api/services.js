'use strict';

const 
  request = require('request'),
  _ = require('underscore'),
  
  Values = require('./models'),
  api = require('./api');

// saves values in db
exports.saveToDatabase = function (obj) {
  Values.create({
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
  var getAllPromise = new Promise(function (resolve, reject) {

    var coinsPaths = {
      cad: api.cad,
      usd: api.usd,
      clp: api.clp
    };

    var readAll = function (coinsPaths) {
      var promise = new Promise(function (resolve, reject) {

        var result = {};
        var mapPosition = _.size(coinsPaths);

        _.map(coinsPaths, function (path, key) {
          readUrl(path)
          .then(function (value) {
            mapPosition--;
            result[key] = value;

            !mapPosition ? resolve(result) : reject(err);
          });
        }); 
      })

      return promise;
    }

    var readUrl = function (path) {
      var promise = new Promise(function (resolve, reject) {
        
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
  var promise = new Promise(function (resolve, reject) {
    request(path, function (err, res, body) {
      err ? reject(err) : resolve(body);
      return;
    });
  });

  return promise;
}