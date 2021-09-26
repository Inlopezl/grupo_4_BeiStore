const product = require('../models/products');
const { validationResult } = require('express-validator');
let db = require('../database/models')
module.exports = {
    indexCart: (req, res) => {
        res.render('products/cart');
    },
    indexDetail: async (req, res) => {
        try {
            if (isNaN(parseInt(req.params.id))) {
                return res.redirect('/error')
            } else {
                const producto = await product.one(req.params.id)
                res.render('products/detail', {
                    producto: producto,
                    error: !this.producto ? 'Error, producto no encontrado.' : ''
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    indexCreate: async (req, res) => {
        try{
            const categories = await db.Categories.findAll();
            const brands = await db.Brands.findAll();

            return res.render('products/create', {
                categories: categories,
                brands: brands,
                oldData: undefined
            });
        }catch (error){
            console.log(error);
        }
    },
    indexEdit: async (req, res) => {
        try {
            const producto = await product.one(req.params.id)
            const categories = await db.Categories.findAll()
            const brands = await db.Brands.findAll()
            return res.render('products/edit', { producto, categories, brands });
        } catch (error) {
            console.log(error);
        }
    },
    indexList:async (req, res) => {
        try {
            const products = await product.all()
            //res.send(products)
            return res.render('products/list', { productos: products, titleProduct: 'Lista de Productos' })
            
        } catch (error) {
            console.log(error);
        }
    },
    save: (req, res) => {
        let error = validationResult(req)
        if (!error.isEmpty()) {
            res.render('products/create', {
                errores: error.mapped(),
                oldData: req.body
            })
        } else {
            let newProduct = product.new(req.body, req.files);
            return newProduct ? res.redirect('/products/') : res.send('Error');
        }
    },
    update: async (req, res) => {
        product.edit(req.body, req.files, req.params.id)
        return res.redirect(`/products/${req.params.id}`);
    },
    delete: (req, res) => {
        let deleteProduct = product.delete(req.params.id);
        return deleteProduct == true ? res.redirect('/home') : res.send('Error, no se pudo eliminar');
    }
}