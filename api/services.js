'use strict';

const 
  request = require('request'),
  _ = require('underscore'),

  Values = require('./models'),
  api = require('./api');

// saves values to db
exports.saveToDatabase = function (obj) {
  Values.create({
    CAD: obj.cad,
    USD: obj.usd,
    CLP: obj.clp
    
  }, (err, values) => {
    return err ? console.log(err) : console.log('Succesfully created values: ' + values + ' in db.');
  }); 
}

// puts group of values in object
exports.getAllCoins = function () {
  var getAllPromise = new Promise((resolve, reject) => {

    var coinsPaths = {
      cad: api.cad,
      usd: api.usd,
      clp: api.clp
    };

    var readAll = function (coinsPaths) {
      var promise = new Promise((resolve, reject) => {

        var result = {};
        var mapPosition = _.size(coinsPaths);

        _.map(coinsPaths, (path, key) => {
          readUrl(path)
          .then((value) => {
            mapPosition--;
            result[key] = value;

            !mapPosition ? resolve(result) : reject(err);
          });
        }); 
      })

      return promise;
    }

    var readUrl = function (path) {
      var promise = new Promise((resolve, reject) => {
        
        readValue(path)
        .then((value) => { resolve(value); })
        .catch((err) => { console.log(err); })

      });

      return promise;
    }

    // executes promise
    readAll(coinsPaths)
    .then((result) => { resolve(result); })
    .catch((err) => { reject(err); });

  });

  return getAllPromise;
}

// reads content of a url and returns a string with result
function readValue (path) {
  var promise = new Promise((resolve, reject) => {
    request(path, (err, res, body) => {
      err ? reject(err) : resolve(body);
      return;
    });
  });

  return promise;
}