var mongoose = require('mongoose'),
	timestamps = require('mongoose-timestamp');

var valuesSchema = new mongoose.Schema({
	CAD: { type: Number },
	USD: { type: Number },
	CLP: { type: Number },
	time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Values', valuesSchema);