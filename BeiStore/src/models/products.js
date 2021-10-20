const path = require('path');
const fs = require('fs');
const db = require('../database/models');
let { Products } = db
models = {
    directory: function() {
        let directory = path.resolve(__dirname, "../data/products.json");
        return directory;
    },
    category: async () =>{
        try {
            const categories = await db.Categories.findAll()
            return categories
        } catch (error) {
            console.log(error);
        }
    },
    all: async () => {
        try {
            const products = await db.Products.findAll({
                include:[{association: 'categories'}, {association:'images'}, {association: 'brand'}]
            })
            return products
        } catch (error) {
            console.log(error);
        }
    },

    one: async (id) => {
        try {
            const product = await Products.findByPk(id,{
                include:[{association: 'categories'}, {association:'images'}, {association: 'brand'}]
            })
            return product != undefined ? product : false;
        } catch (error) {
            console.log(error);
        }
    },
    new: async (data, files) => {
        try{
            let images = [];
            files.forEach(element => images.push(element.filename));
            await Products.create({
                name: data.name,
                description: data.description,
                off: data.off,
                price: data.price,
                sales: 0,
                brand_id: data.brand
            })
            Products.findAll()
            .then(products => {
                console.log(products)
                images.forEach(img => {
                    db.Images.create({
                        name: img,
                        product_id: products[products.length-1].id 
                    })
                })
                if(Array.isArray(data.category)){
                    data.category.forEach(category => {
                        db.ProductCategory.create({
                            product_id: products[products.length - 1].id,
                            category_id: category
                        })
                    })
                } else {
                    db.ProductCategory.create({
                        product_id: products[products.length - 1].id,
                        category_id: data.category
                    })
                }
    
            })
            .catch(error => console.log(error))
            
            
            
        } catch (error) {
            console.log(error);
        }
        
        return true;
    },
    edit: async (data, files, id) => {
        if(Array.isArray(data.deleteImage)){
            data.deleteImage.forEach(img => {
                fs.unlinkSync(path.resolve(__dirname, "../../public/images/productos/", img))
                db.Images.destroy({
                    where: {
                        name: img,
                        product_id: id
                    }
                })
            })
        } else if(data.deleteImage != undefined){
            fs.unlinkSync(path.resolve(__dirname, "../../public/images/productos/", data.deleteImage))
            db.Images.destroy({
                where:{
                    name: data.deleteImage,
                    product_id: id
                }
            })
        }
        if(files){
            files.forEach(img => {
                db.Images.create({
                    name: img.filename,
                    product_id: id
                })
            });
        }
        db.ProductCategory.destroy({
            where: {
                product_id: id,
            }
        })
        if (Array.isArray(data.category)) {
            data.category.forEach(categoria => {
                db.ProductCategory.create({
                    product_id: id,
                    category_id: categoria
                })
            })
        } else {
            db.ProductCategory.create({
                product_id: id,
                category_id: data.category
            })
        }

        Products.update({
            name: data.name,
            description: data.description,
            off: data.off,
            price: data.price,
            brand_id: data.brand
        }, {
            where: {
                id: id
            }
        })

        return true;
    },
    delete: async (id) =>  {
        try {
            const producto = await Products.findByPk(id,{
                include:[{association: 'categories'}, {association:'images'}, {association: 'brand'}]
            })

            producto.images.forEach(img => {
                console.log(img)
                fs.unlinkSync(path.resolve(__dirname, "../../public/images/productos/", img.dataValues.name))
            })
            db.Images.destroy({
                where : {
                    product_id: id
                }
            })
            db.ProductCategory.destroy({    
                where : {
                    product_id: id
                }
            })
            Products.destroy({
                where: {
                    id: id
                }
            })

            console.log('pase por aca');
            console.log(producto);

        } catch (error) {
            console.log(error);
        }
        return true;
    },
    readCart: async(id) =>{
        try {
            let items = []
            let imagenes = []
            let cart = await db.Cart.findAll({
                include:[{association: 'item'}],
                where:{
                    user_id: id
                }
            })

            cart = cart.map(item => item.item_id)
            for (const id of cart) {
                const elemento = await db.Items.findByPk(id,{ include: [ {association: 'producto'}]})
                items.push({
                    name: elemento.producto.name,
                    quantity: elemento.quantity,
                    price: elemento.producto.price,
                    off: elemento.producto.off,
                    product_id: elemento.producto.id,

                })
            }
            for (const item of items) {
                const img = await db.Products.findByPk(item.product_id,{
                    include: [{association: 'images'}]
                })
                imagenes.push(img.images[0].name)
            }
            items.forEach((item, i) => {
                item.image = imagenes[i]
            })
            return items
        } catch (error) {
            
        }
    },
    itemUpload:async ( dato, id) =>{
        try {
            const items = await db.Items.findAll()
            db.Items.create({
                quantity: dato.quantity,
                product_id: dato.id
            })
            db.Cart.create({
                item_id: items[items.length -1].id + 1,
                user_id: id,
                paid: false
            })
            return items
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = models;