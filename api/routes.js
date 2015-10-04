'use strict';

const mongoose = require('mongoose'),
	express = require('express'),
	router = express.Router(),
	controllers = require('./controllers');

router.get('/getAll', controllers.getAll);
router.get('*', controllers.useAngular);

module.exports = router;