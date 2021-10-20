const express = require('express');
const router = express.Router();
const multerFolder = require('../middlewares/multerFolderMw');
const isAdmin = require('../middlewares/users/isAdminMw');
const CreateVerificator = require('../middlewares/products/createVerificator')

const controller = require('../controllers/productController');

// Vista Crear Producto
router.get('/create',[isAdmin],controller.indexCreate);

// Guardar Producto
router.post('/create', [ isAdmin, multerFolder('product', 'productos/').any(), CreateVerificator ], controller.save);

// lista de productos
router.get('/', controller.indexList); 

// vista editar producto 
router.get('/edit/',[isAdmin], controller.indexEditList);

// vista editar producto 
router.get('/edit/:id',[isAdmin],  controller.indexEdit);

// editar producto
router.put('/edit/:id', [isAdmin, multerFolder('product', 'productos/').any(), CreateVerificator], controller.update); 

// eliminar producto
router.delete('/delete/:id',[isAdmin], controller.delete); 

router.get('/cart', controller.indexCart);
//carrito - guardar item
router.post('/cart/upload', multerFolder('product', 'productos/').any(), controller.cartUpload)

router.get('/:id', controller.indexDetail);




module.exports = router;