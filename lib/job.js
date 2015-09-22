var middlewares = require('./middlewares');

var job = function () {
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

module.exports = job;