const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

models = {
    directory: function() {
        let directory = path.resolve(__dirname, "../data/users.json");
        return directory;
    },
    findAll: function() {
        let file = fs.readFileSync(this.directory(), 'utf-8');
        const users = JSON.parse(file);
        return users
    },

    findByPk: function(id) {
        let users = this.findAll();
        const user = users.find(element => element.id == id);
        return user != undefined ? user: false;
    },
    findByField: function(field, text){
        let users = this.findAll();
        const user = users.find(element => element[field] == text);
        return user != undefined ? user: false;
    },
    findByFieldGroup: function(field, text){
        let users = this.findAll();
        const user = users.filter(element => element[field].includes(text));
        return user != undefined ? user: false;
    },
    new: function(data, file) {
        let users = this.findAll();
        if(this.findByField('email', data.email)){
           return false 
        }

        let newUser = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            firstName: data.firstName,
            surName: data.surName,
            avatar: file != undefined ? file.filename : "avatar_default.jpg",
            email: data.email,
            password: bcrypt.hashSync(data.password, 10)
        }
        users.push(newUser);
        fs.writeFileSync(this.directory(), JSON.stringify(users, null, 2));
        return true;
    },
    edit: function(data, files, id) {
        let users = this.all();
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
            fs.unlinkSync(path.resolve(__dirname, "../../public/images/usuarios/", data.deleteImage))
        }

        users.forEach(element => {
            if (element.id == id) {
                element.firstName = data.firstName;
                element.surName = data.surName;
                element.email = data.email;
                element.off = data.off;
                element.image = images;
                element.password = data.password
            }
        });

        fs.writeFileSync(this.directory(), JSON.stringify(products, null, 2));
        return true;
    },
    delete: function(id) {
        //trae todos los usuarios
        let users = this.all();
        //elimina las imagenes del usuario
        this.one(id).image.forEach(element => fs.unlinkSync(path.resolve(__dirname, "../../public/images/usuarios/", element)))
        //guarda todos los usuarios en la misma variable
        users = users.filter(element => element.id != id);
        fs.writeFileSync(this.directory(), JSON.stringify(users, null, 2));
        return true;
    }
}
module.exports = models;