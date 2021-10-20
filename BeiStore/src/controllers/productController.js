const product = require('../models/products');
const { validationResult } = require('express-validator');
let db = require('../database/models')
module.exports = {
    indexCart:async (req, res) => {
        const cart = await product.readCart(req.session.userLogged.id)
        res.render('products/cart',{
            cart
        });
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
    save: async (req, res) => {
        try {
            const categories = await db.Categories.findAll();
            const brands = await db.Brands.findAll();
            let error = validationResult(req)
            if (!error.isEmpty()) {
                req.body.category = req.body.category && req.body.category.length == 1 ? [req.body.category]: req.body.category
                res.render('products/create', {
                    categories,
                    brands,
                    errores: error.mapped(),
                    oldData: req.body,
                })
            } else {
                console.log(req.body);
                console.log(req.files);
                product.new(req.body, req.files);
                return res.redirect('/products/')
            }
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        try {
            const categories = await db.Categories.findAll();
            const producto = await product.one(req.params.id)
            const brands = await db.Brands.findAll();
            let error = validationResult(req)
            if (!error.isEmpty()) {
                req.body.category = req.body.category && req.body.category.length == 1 ? [req.body.category]: req.body.category
                res.render('products/edit', {
                    producto,
                    categories,
                    brands,
                    errores: error.mapped(),
                    oldData: req.body
                })
            } else {
                product.edit(req.body, req.files, req.params.id)
                return res.redirect(`/products/${req.params.id}`);  
            }
        } catch (error) {
            console.log(error);
        }
    },
    delete: (req, res) => {
        product.delete(req.params.id);
        return res.redirect('/home');
    },
    cartUpload: async(req, res)=>{
        if(req.session.userLogged){
            user_id = req.session.userLogged.id
        } else {
            return res.redirect('/users/login')
        }
        product.itemUpload(req.body,user_id)
        return res.redirect('/home')
    }
}