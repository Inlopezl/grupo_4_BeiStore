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
        const product = products.filter(element => element.id == id);
        return product; 
    },
    new: function(data, files){
        console.log(files);
        let images = [];
        files.forEach(element => images.push(element.filename));
        let products = this.all();
        let newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            name: data.nombre,
            descrition: data.descripcion,
            categoria: data.categoria,
            image: images,
            price: data.price
        }
        products.push(newProduct);
        fs.writeFileSync(this.directory(), JSON.stringify(products, null, 2));
        return true;
    },
    edit: function(data, file, id){
        let products = this.all();
        let images = [];
        files.forEach(element => images.push(element.filename));
        products.forEach(element => {
            if(element.id == id){
                element.name = data.name;
                element.description = data.description;
                element.image = images;
                price = data.price;
            }
        });
        fs.writeFileSync(this.directory(), JSON.stringify(products, null, 2));
        return true;
    },
    delete: function(id){
        let products = this.all();
        products = products.filter(element => element.id != id);
        fs.writeFileSync(this.directory(), JSON.stringify(products, null, 2));
        return true;
    }
}
module.exports = models;