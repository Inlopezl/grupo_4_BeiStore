const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController');

router.get('/productCart', controller.indexCart);
router.get('/productDetail', controller.indexDetail);

module.exports = router;