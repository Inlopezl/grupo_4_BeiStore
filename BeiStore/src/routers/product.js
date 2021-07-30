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

router.get('/create', controller.indexCreate);
router.get('/:id', controller.indexDetail);
router.get('/edit/:id', controller.indexEdit);
router.get('/cart', controller.indexCart);

router.post('/save', [upload.any()], controller.save);

router.put('/update/:id', [upload.any()], controller.update); 

router.delete('/delete/:id', controller.delete); 

module.exports = router;