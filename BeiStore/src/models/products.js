const path = require('path');
const fs = require('fs');
const db = require('../database/models');
let { Products } = db
models = {
    directory: function() {
        let directory = path.resolve(__dirname, "../data/products.json");
        return directory;
    },
    all: function() {
        let file = fs.readFileSync(this.directory(), 'utf-8');
        file = file == '' ? [] : file;
        const object = JSON.parse(file);
        return object
    },

    one: function(id) {
        let products = this.all();
        const product = products.filter(element => element.id == id)[0];
        return product != undefined ? product : false;
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
    edit: function(data, files, id) {
        let products = this.all();
        let images = [];
        if (Array.isArray(data.imagenesViejas)) {
            data.imagenesViejas.forEach(element => images.push(element));
        } else if (data.imagenesViejas != undefined) {
            images.push(data.imagenesViejas)
        }
        files.forEach(element => images.push(element.filename));
        let imagesNuevas = []
        if (Array.isArray(data.deleteImage)) {
            images.forEach(element => {
                let encontro = false;
                data.deleteImage.forEach(img => {
                    if (img == element) {
                        encontro = true;
                        fs.unlinkSync(path.resolve(__dirname, "../../public/images/productos/", element))
                    }
                })
                if (!encontro) {
                    imagesNuevas.push(element);
                }
            })
            images = imagesNuevas;
        } else if (data.deleteImage != undefined) {
            images = images.filter(element => element != data.deleteImage)
            fs.unlinkSync(path.resolve(__dirname, "../../public/images/productos/", data.deleteImage))
        }

        products.forEach(element => {
            if (element.id == id) {
                element.name = data.name;
                element.description = data.description;
                element.category = data.category;
                element.off = data.off;
                element.image = images;
                element.price = data.price;
            }
        });

        fs.writeFileSync(this.directory(), JSON.stringify(products, null, 2));
        return true;
    },
    delete: function(id) {
        //trae todos los productos
        let products = this.all();
        //elimina las imagenes del producto
        this.one(id).image.forEach(element => fs.unlinkSync(path.resolve(__dirname, "../../public/images/productos/", element)))
            //guarda todos los productos en la misma variable
        products = products.filter(element => element.id != id);
        fs.writeFileSync(this.directory(), JSON.stringify(products, null, 2));
        return true;
    }
}
module.exports = models;