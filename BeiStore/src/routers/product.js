const express = require('express');
const router = express.Router();
const multerFolder = require('../middlewares/multerFolderMw');
const CreateVerificator = require('../middlewares/products/createVerificator')

const controller = require('../controllers/productController');

// Vista Crear Producto
router.get('/create', controller.indexCreate);

// Guardar Producto
router.post('/create', [ multerFolder('product', 'productos/').any(), CreateVerificator ], controller.save);

router.get('/cart', controller.indexCart);
router.get('/:id', controller.indexDetail);
router.get('/edit/:id', controller.indexEdit);
router.get('/', controller.indexList); 


router.put('/update/:id', [multerFolder('product', 'productos/').any()], controller.update); 

router.delete('/delete/:id', controller.delete); 

module.exports = router;