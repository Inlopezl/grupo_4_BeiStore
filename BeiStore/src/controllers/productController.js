const product = require('../models/products');
const { validationResult } = require('express-validator');

module.exports = {
    indexCart: (req, res) => {
        res.render('products/cart');
    },
    indexDetail: (req, res) =>{
        if(isNaN(parseInt(req.params.id)) ){
            return res.redirect('/error')
        } else {
            res.render('products/detail', {
                    producto : product.one(req.params.id),
                    error: !this.producto ? 'Error, producto no encontrado.' : ''
            });
        }
    },
    indexCreate: (req, res) => {
        res.render('products/form', { 
            action: '/products/save' , 
            typePage: 'create', 
            title: 'Crear un producto',
            oldData: undefined
        });
    },
    indexEdit:(req,res) =>{
        res.render('products/form', { action: `/products/update/${product.one(req.params.id).id}?_method=PUT` , typePage: 'edit', title: 'Editar producto', producto: product.one(req.params.id)});
    },
    indexList: (req, res)=>{
        res.render('products/list', {productos: product.all(), titleProduct: 'Lista de Productos'}) 
    },
    save: (req, res)=>{
        let error = validationResult(req)
        if(!error.isEmpty()){ 
            res.render('products/form', { 
                action: '/products/save' ,
                typePage: 'create', 
                title: 'Crear un producto', 
                errores : error.mapped(),
                oldData: req.body
            }) 
            console.log(req.body);
        } else{
            let newProduct = product.new(req.body, req.files);
            return newProduct == true? res.redirect('/home'): res.send('Error');
        }
    },
    update: (req, res)=>{
        let editProduct = product.edit(req.body, req.files, req.params.id);
        return editProduct == true? res.redirect('/home'): res.send('Error, no se pudo editar');
    },
    delete: (req, res) => {
        let deleteProduct = product.delete(req.params.id);
        return deleteProduct == true? res.redirect('/home'): res.send('Error, no se pudo eliminar');   
    }
}