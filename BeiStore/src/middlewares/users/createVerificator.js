const { body } = require('express-validator');


module.exports = [
    body("firstName").notEmpty().withMessage("Debe escribir un nombre"),
    body("surName").notEmpty().withMessage("Debe escribir un apellido").bail(),
    body("email").notEmpty().withMessage("Debe escribir un email").bail(),
    body("password").notEmpty().withMessage("Debe escribir una contraseña").bail()
]