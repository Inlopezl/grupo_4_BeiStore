const product = require('../models/products');
module.exports = {
    indexCart: (req, res) => {
        res.render('products/productCart');
    },
    indexDetail: (req, res) =>{
        res.render('products/productDetail');
    },
    indexCreate: (req, res) => {
        res.render('products/productCreate');
    },
    create: (req, res)=>{
        let newProduct = product.new(req.body, req.files);
        return newProduct == true? res.redirect('/home'): res.send('Error');
    },
    edit: (req, res)=>{
        let editProduct = product.edit(req.body, req.file, req.params.id);
        return editProduct == true? res.redirect('/home'): res.send('Error, no se pudo editar');
    },
    delete: (req, res) => {
        let deleteProduct = product.delete(req.params.id);
        return deleteProduct == true? res.redirect('/home'): res.send('Error, no se pudo eliminar');   
    }
}