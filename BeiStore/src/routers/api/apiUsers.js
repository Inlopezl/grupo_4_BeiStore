const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/apiControllerUser');


router.get('/', controller.datosGenerales )
router.get('/:id', controller.detalle )

module.exports = router;