const {body} = require('express-validator');

module.exports = [
    body('name').notEmpty().withMessage('El producto debe tener un nombre'),
    body('description').notEmpty().withMessage('El producto debe tener una descripcion').bail(),
    body('category').custom((value, {req}) => {
        return req.body.category != undefined ? true : false;
    }).withMessage('debe seleccionar una opcion').bail()

]