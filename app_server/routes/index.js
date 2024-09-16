var express = require('express');

var router = express.Router();

const controlMain = require('../controller/main');

/* GET home page. */
router.get('/', controlMain.index); 

module.exports = router;