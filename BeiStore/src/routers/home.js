const express = require('express');
const router = express.Router();

const controller = require('../controllers/homeController');
const test = require('../controllers/testController');

router.get('/', controller.index);
router.get('/home', controller.index);
router.get( '/test' , test.test)
module.exports = router;

