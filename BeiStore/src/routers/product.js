const express = require('express');
const router = express.Router();
const multerFolder = require('../middlewares/multerFolderMw');
const CreateVerificator = require('../middlewares/products/createVerificator')
const editVerificator = require('../middlewares/products/editVerificator')

const controller = require('../controllers/productController');

// Vista Crear Producto
router.get('/create', controller.indexCreate);

// Guardar Producto
router.post('/create', [ multerFolder('product', 'productos/').any(), CreateVerificator ], controller.save);

// lista de productos
router.get('/', controller.indexList); 

// vista editar producto 
router.get('/edit/:id', controller.indexEdit);

// editar producto
router.put('/edit/:id', [multerFolder('product', 'productos/').any(), editVerificator], controller.update); 

// eliminar producto
router.delete('/delete/:id', controller.delete); 


router.get('/cart', controller.indexCart);
router.get('/:id', controller.indexDetail);




module.exports = router;