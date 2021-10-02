const { body } = require('express-validator');
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
module.exports  = [
    body('email').notEmpty().withMessage('Complete el campo').bail()
    .isEmail().withMessage('Email invalido').bail()
    .custom(async (value) => {
        const emails = await usuarios() 
        let encontro = false
        emails.forEach(email =>{
            const regex = new RegExp(email, "gi");
            if(regex.test(value)){
                encontro = true
            }
        })
        if(!encontro){
            throw new Error('El email no está registrado');
        }
        return true
    }),
    body('password').notEmpty().withMessage('Debe completar la contraseña').bail()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).withMessage('La contraseña no tiene ningun caracter especial')
]

