const {body} = require('express-validator');
const { validationResult } = require('express-validator');
const path = require('path')
const fs = require('fs')
module.exports = [
    body('name').notEmpty().withMessage('El producto debe tener un nombre'),
    body('description').notEmpty().withMessage('El producto debe tener una descripcion').bail(),
    body('category').custom((value, {req}) => {
        return req.body.category != undefined ? true : false;
    }).withMessage('Debe seleccionar una opcion').bail(),
    body('price').notEmpty().withMessage('Debe ingresar un precio al producto').bail(),
    body('images').custom((value, { req }) => {
        // console.log(!validationResult(req).isEmpty())
        let file = req.files;
        const fileAvailable = ['.jpg', '.png', '.svg', '.tif']
        if(!file.length){
            throw new Error('Debe ingresar una imagen que describa el producto');
        } else{
            file.forEach(element => {
                if(!( fileAvailable.includes(path.extname(element.originalname)) && file )){
                    file.forEach(imagen =>fs.unlinkSync(path.resolve("./public/images/productos/", imagen.filename )));
                    throw new Error(`Tipo de archivo incorrecto, solo se acceptan ${fileAvailable.join(', ')}`);
                } else if(element.size > 6291456){
                    file.forEach(imagen =>fs.unlinkSync(path.resolve("./public/images/productos/", imagen.filename )));
                    throw new Error(`El archivo ${element.originalname} es muy pesado. El peso maximo de 6Mb`);
                }
            }) 
        } 
        if(!validationResult(req).isEmpty()){
            file.forEach(imagen =>fs.unlinkSync(path.resolve("./public/images/productos/", imagen.filename )));
            throw new Error('Solucione los errores en el formulario, reingrese las imagenes');
        }
        return true;
    })
]