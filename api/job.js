'use strict';

const 
  getAllCoins = require('./services').getAllCoins,
  saveToDatabase = require('./services').saveToDatabase;

// creates a job that runs every minute
function updateValues () {
  setInterval(function () {
    console.log('Starts updating job');

    getAllCoins()
    .then(function (object) {
      console.log('Finished updating');
      return saveToDatabase(object);
    })
    .catch(function (err) {
      console.log(err);
    });

  }, 60000);
}

updateValues();