const express = require('express')
const router = express.Router()
const controller = require('../../controllers/api/apiControllerProduct')

router.get('/', controller.datosGenerales)
router.get('/:id', controller.detelles )
router.get('/:id/image/:name', controller.enviarImagen )

module.exports = router

