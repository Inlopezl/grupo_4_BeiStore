const path = require('path');
const fs = require('fs');

models = {
    directory: function(){
        let directory = path.resolve( __dirname ,  "../data/products.json");
        return directory;
    },
    all: function(){
        let file = fs.readFileSync(this.directory(), 'utf-8');
        file = file == ''? []:file;
        const object = JSON.parse(file);
        return object 
    },

    one: function(id){
        let products = this.all();
        const product = products.filter(element => element.id == id)[0];
        return product; 
    },
    new: function(data, files){
        let images = [];
        files.forEach(element => images.push(element.filename));
        let products = this.all();
        let newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            name: data.nombre,
            descrition: data.descripcion,
            categoria: data.categoria,
            descuento: data.descuento,
            image: images,
            price: data.price
        }
        products.push(newProduct);
        fs.writeFileSync(this.directory(), JSON.stringify(products, null, 2));
        return true;
    },
    edit: function(data, files, id){
        let products = this.all();
        let images = [];
        if( Array.isArray(data.imagenesViejas) ){
            data.imagenesViejas.forEach(element => images.push(element));
        } else if(data.imagenesViejas != undefined) {
            images.push(data.imagenesViejas)
        }
        files.forEach(element => images.push(element.filename));
        let imagesNuevas = []
        if( Array.isArray(data.deleteImage)  ){
            images.forEach(element =>{
                let encontro = false;
                data.deleteImage.forEach(img => {
                    if(img == element){
                        encontro = true;
                        fs.unlinkSync(path.resolve(__dirname,"../../public/images/productos/", element ))
                    }
                })
                if(!encontro){
                    imagesNuevas.push(element);
                }
            })
            images = imagesNuevas;
        } else if(data.deleteImage != undefined ){
            images = images.filter(element => element != data.deleteImage)
            fs.unlinkSync(path.resolve(__dirname,"../../public/images/productos/", data.deleteImage ))
        }
        
            
        products.forEach(element => {
            if(element.id == id){
                element.name = data.nombre;
                element.descrition = data.descripcion;
                element.categoria = data.categoria;
                element.descuento = data.descuento;
                element.image = images;
                element.price = data.price;
            }
        });

        fs.writeFileSync(this.directory(), JSON.stringify(products, null, 2));
        return true;
    },
    delete: function(id){
        //trae todos los productos
        let products = this.all();
        //elimina las imagenes del producto
        this.one(id).image.forEach(element => fs.unlinkSync(path.resolve(__dirname,"../../public/images/productos/", element )) )
        //guarda todos los productos en la misma variable
        products = products.filter(element => element.id != id);
        fs.writeFileSync(this.directory(), JSON.stringify(products, null, 2));
        return true;
    }
}
module.exports = models;