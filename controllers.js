var middlewares = require('./middlewares');

exports.getAll = function (req, res) {
	// findOne el último dato de la db. 
	middlewares.saveValuesToObject(function (err, obj) {
		console.log(obj)
	});
}

exports.saveNew = function (req, res) {
	// save nueva entrada en la db
	res.send('Holi desde saveNew');
}