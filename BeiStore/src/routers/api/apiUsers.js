const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/apiControllerUser');


router.get('/', controller.datosGenerales )
router.get('/:id', controller.detalle )
router.get('/:id/image/:name', controller.enviarImagen )

module.exports = router;