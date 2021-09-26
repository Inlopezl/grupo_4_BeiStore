const path = require('path');
const fs = require('fs');
const db = require('../database/models');
let { Products } = db
models = {
    directory: function() {
        let directory = path.resolve(__dirname, "../data/products.json");
        return directory;
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
        console.log(data);
        try{
            let images = [];
            files.forEach(element => images.push(element.filename));
            Products.create({
                name: data.name,
                description: data.description,
                off: data.off,
                price: data.price,
                brand_id: data.brand
            })
            const products = await Products.findAll();
            images.forEach(img => {
                db.Images.create({
                    image: img,
                    product_id: products.length + 1 
                })
            })
            
            if(Array.isArray(data.category)){
                data.category.forEach(category => {
                    db.ProductCategory.create({
                        product_id: products.length +1,
                        category_id: category
                    })
                })
            } else {
                db.ProductCategory.create({
                    product_id: products.length +1,
                    category_id: data.category
                })
            }

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
                        image: img,
                        product_id: id
                    }
                })
            })
        } else if(data.deleteImage != undefined){
            fs.unlinkSync(path.resolve(__dirname, "../../public/images/productos/", data.deleteImage))
            db.Images.destroy({
                where:{
                    image: data.deleteImage,
                    product_id: id
                }
            })
        }
        if(files){
            files.forEach(img => {
                db.Images.create({
                    image: img.filename,
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
                fs.unlinkSync(path.resolve(__dirname, "../../public/images/productos/", img.image))
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

        } catch (error) {
            console.log(error);
        }
        return true;
    }
}
module.exports = models;