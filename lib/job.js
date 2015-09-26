var getAllCoins = require('./services').getAllCoins,
	saveToDatabase = require('./services').saveToDatabase;

// creates a job that runs every minute
exports.updateValues = function () {
	setInterval(function () {
		console.log('Starts updating job');

		getAllCoins(function (err, object) {
			if (err) return err;
			console.log('Finished updating');

			return saveToDatabase(object);
		});
	}, 30000);
}