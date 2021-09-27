const {body} = require('express-validator');
const { validationResult } = require('express-validator');
const path = require('path')
const fs = require('fs')
const db = require('../../database/models')
let categoria = async() => {
    try {
        const category = await db.Categories.findAll()
        let resultado = []
        category.forEach(cat => {
            resultado.push(cat.id)
        })
        return resultado
    } catch (error) {
        console.log(error);
    }
}
let marcas = async() => {
    try {
        const brand = await db.Brands.findAll()
        let resultado = []
        brand.forEach(element => {
            resultado.push(element.id)
        })
        return resultado
    } catch (error) {
        console.log(error);
    }
}
module.exports = [
    body('name').notEmpty().withMessage('El producto debe tener un nombre').bail().isLength({ min: 5 })
    .withMessage('El nombre debe tener más de 5 caracteres'),
    body('description').notEmpty().withMessage('El producto debe tener una descripcion').bail()
    .isLength({ min: 20 }).withMessage('Debe tener más de 20 caracteres').bail(),
    body('category').custom( async (value, {req}) => {
        if(value == undefined){
            throw new Error('Debe elegir una categoria');
        }
        let valor = await categoria()
        let encontro = false
        valor.forEach(element => {
            if (Array.isArray(value)) {
                value.forEach( valor => {
                    if(element == valor ){
                        encontro = true
                    }   
                })
            }else {
                if(element == value){
                    encontro = true
                }   
            }
        })
        valor.forEach(element => {
            if(element == value){
                encontro = true
            }   
        })
        if(!encontro){
            throw new Error('Valor invalido, actualizar pagina');
        }
    }).bail(),
    body('brand').custom( async (value, {req}) => {
        if(value == undefined){
            throw new Error('Debe elegir una marca');
        }
        let valor = await marcas()
        let encontro = false
        valor.forEach(element => {
            if(element == value){
                encontro = true
            }   
        })
        if(!encontro){
            throw new Error('Debe elegir una marca');
        }
    }),
    body('price').notEmpty().withMessage('Debe ingresar un precio al producto').bail()
    .isNumeric().withMessage('Debe ingresar un numero').bail(),
    body('off').custom(value => {
        console.log(value);
        if(value == ''){
            return true
        }
        if(isNaN(parseInt(value))){
            return false
        }
        return true
    }).withMessage('Debe ingresar un numero').bail(),
    body('images').custom((value, { req }) => {
        console.log(req.files);
        if(req.body.imagenesViejas && req.body.deleteImage){
            if(req.body.imagenesViejas.length == req.body.deleteImage.length && req.files.length == 0){
                throw new Error('El producto no se puede quedar sin imagenes');
            }
        }
        if(req.body.imagenesViejas){
            return true
        }
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