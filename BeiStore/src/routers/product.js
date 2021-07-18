const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images/productos/'));
    },
    filename: (req, file, cb) => {
        let name = 'product' + Date.now() + path.extname(file.originalname);
        cb(null, name);
    }
})

const upload = multer({storage: storage})

const controller = require('../controllers/productController');

router.get('/productCart', controller.indexCart);
router.get('/productDetail/:id', controller.indexDetail);
router.get('/admin/createProduct', controller.indexCreate);
router.post('/admin/createProduct', [upload.any()], controller.create);
router.get('/admin/editProduct/:id', controller.indexEdit);
router.put('/admin/editProduct/:id', [upload.any()], controller.edit);

module.exports = router;