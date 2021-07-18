const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController');

router.get('/productCart', controller.indexCart);
router.get('/productDetail', controller.indexDetail);
router.get('/admin/createProduct', controller.indexCreate);

module.exports = router;