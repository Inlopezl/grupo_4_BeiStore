const {body} = require('express-validator');

module.exports = [
    body('nombre').notEmpty().withMessage('El producto debe tener un nombre')
]