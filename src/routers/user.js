const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');

router.get('/login', controller.indexLogin);
router.get('/register', controller.indexRegister);

module.exports = router;
