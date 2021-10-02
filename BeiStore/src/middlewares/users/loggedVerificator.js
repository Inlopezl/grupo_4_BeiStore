const { body } = require('express-validator');
const { validationResult } = require('express-validator');

module.exports  = [
    body('email').custom(value => {
        console.log(value);
    })
]

