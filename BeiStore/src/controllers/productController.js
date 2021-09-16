const product = require('../models/products');
const { validationResult } = require('express-validator');
let db = require('../database/models')
module.exports = {
    indexCart: (req, res) => {
        res.render('products/cart');
    },
    indexDetail: (req, res) => {
        if (isNaN(parseInt(req.params.id))) {
            return res.redirect('/error')
        } else {
            res.render('products/detail', {
                producto: product.one(req.params.id),
                error: !this.producto ? 'Error, producto no encontrado.' : ''
            });
        }
    },
    indexCreate: (req, res) => {
        res.render('products/create', {
            oldData: undefined
        });
    },
    indexEdit: (req, res) => {
        res.render('products/form', { action: `/products/update/${product.one(req.params.id).id}?_method=PUT`, typePage: 'edit', title: 'Editar producto', producto: product.one(req.params.id) });
    },
    indexList: (req, res) => {
        res.render('products/list', { productos: product.all(), titleProduct: 'Lista de Productos' })
    },
    save: (req, res) => {
        let error = validationResult(req)
        if (!error.isEmpty()) {
            res.render('products/create', {
                errores: error.mapped(),
                oldData: req.body
            })
        } else {
            /*db.Products.create({
                name: req.body.name
            })*/
            let newProduct = product.new(req.body, req.files);
            return newProduct ? res.redirect('/products/') : res.send('Error');
            //return res.redirect('/products')
        }
    },
    update: (req, res) => {
        let editProduct = product.edit(req.body, req.files, req.params.id);
        return editProduct == true ? res.redirect('/home') : res.send('Error, no se pudo editar');
    },
    delete: (req, res) => {
        let deleteProduct = product.delete(req.params.id);
        return deleteProduct == true ? res.redirect('/home') : res.send('Error, no se pudo eliminar');
    }
}