const { body } = require('express-validator');
const { validationResult } = require('express-validator');
const path = require('path')
const fs = require('fs')
const db = require('../../database/models')
let usuarios = async() => {
    try {
        const usuarios = await db.Users.findAll()
        let resultado = []
        usuarios.forEach(user  => resultado.push(user.email))
        return resultado
    } catch (error) {
        console.log(error);
    }
}


module.exports = [
    body("firstName").notEmpty().withMessage("Debe escribir un nombre").bail()
    .isLength({min: 2}).withMessage('Debe tener al menos 2 caracteres'),
    body("surName").notEmpty().withMessage("Debe escribir un apellido").bail(),
    body("email").notEmpty().withMessage("Debe escribir un email").bail()
    .isEmail().withMessage('Debe escribir un email correcto').bail()
    .custom(async (value) => {
        const emails = await usuarios() 
        emails.forEach(email =>{
            const regex = new RegExp(email, "gi");
            if(regex.test(value)){
                throw new Error('El email ya está registrado');
            }
        })
        return true
    }),
    body("password").notEmpty().withMessage("Debe escribir una contraseña").bail()
    .isLength({min: 8}).withMessage('Debe tener al menos 8 caracteres').bail()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).withMessage('Deberá tener letras mayúsculas, minúsculas, un número y un carácter especial'),
    body('avatar').custom((value, {req}) => {
        let file = req.file;
        const fileAvailable = ['.jpg', '.png', '.svg', '.tif']
        if(!file){
            return true
        } else{
            if(!(fileAvailable.includes(path.extname(file.originalname)))){
                fs.unlinkSync(path.resolve("./public/images/avatars/", file.filename ))
                throw new Error(`Tipo de archivo incorrecto, solo se acceptan ${fileAvailable.join(', ')}`);
            } else if(file.size > 6291456){
                fs.unlinkSync(path.resolve("./public/images/avatars/", file.filename ))
                throw new Error(`El archivo ${file.originalname} es muy pesado. El peso maximo de 6Mb`);
            } 
        } 
        if(!validationResult(req).isEmpty()){
            fs.unlinkSync(path.resolve("./public/images/avatars/", file.filename ))
            throw new Error('Solucione los errores en el formulario, reingrese las imagenes');
        }
        return true;
    })
]