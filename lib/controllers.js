var path = require('path'),
	CronJob = require('cron').CronJob,
	middlewares = require('./middlewares'),
	valuesModel = require('./models');

exports.getAll = function (req, res) {
	// findOne el último dato de la db. 
	var job = new CronJob('')
		valuesModel.find().limit(1).sort({time: -1}).exec(function (err, values) {
			if (err) return err;
			res.send(values).end();
		});
}

exports.saveNew = function (req, res) {
	// save nueva entrada en la db
	middlewares.updateValues(function (err, obj) {
		if (err) return err;

		var values = new valuesModel({
			CAD: obj.cad,
			USD: obj.usd,
			CLP: obj.clp
		});

		values.save(function (err, values) {
			if (err) return err;

			console.log(values);
			res.send('Succesfully created values in db.');
		});
	});
}

exports.useAngular = function (req, res) {
	res.sendFile(path.join(__dirname, 'public/views/index.html'));
}