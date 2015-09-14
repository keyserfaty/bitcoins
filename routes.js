var mongoose = require('mongoose'),
	express = require('express'),
	router = express.Router(),
	controllers = require('./controllers');

router.get('/getAll', controllers.getAll);
router.post('/saveNew', controllers.saveNew);
router.get('*', controllers.useAngular);

module.exports = router;