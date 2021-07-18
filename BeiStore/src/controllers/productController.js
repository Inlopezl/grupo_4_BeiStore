const product = require('../models/products');
module.exports = {
    indexCart: (req, res) => {
        res.render('products/productCart');
    },
    indexDetail: (req, res) =>{
        res.render('products/productDetail', {producto : product.one(req.params.id)[0]});
    },
    indexCreate: (req, res) => {
        res.render('products/productCreate', { action: '/admin/createProduct' , typePage: 'create', title: 'Crear un producto'});
    },
    indexEdit:(req,res) =>{
        res.render('products/productCreate', { action: `/admin/editProduct/${product.one(req.params.id)[0].id}?_method=PUT` , typePage: 'edit', title: 'Editar producto', producto: product.one(req.params.id)});
    },
    create: (req, res)=>{
        let newProduct = product.new(req.body, req.files);
        return newProduct == true? res.redirect('/home'): res.send('Error');
    },
    edit: (req, res)=>{
        let editProduct = product.edit(req.body, req.files, req.params.id);
        return editProduct == true? res.redirect('/home'): res.send('Error, no se pudo editar');
    },
    delete: (req, res) => {
        let deleteProduct = product.delete(req.params.id);
        return deleteProduct == true? res.redirect('/home'): res.send('Error, no se pudo eliminar');   
    }
}