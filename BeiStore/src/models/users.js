const path = require('path');
const fs = require('fs');

models = {
    directory: function() {
        let directory = path.resolve(__dirname, "../data/users.json");
        return directory;
    },
    all: function() {
        let file = fs.readFileSync(this.directory(), 'utf-8');
        file = file == '' ? [] : file;
        const object = JSON.parse(file);
        return object
    },

    one: function(id) {
        let users = this.all();
        const user = users.filter(element => element.id == id)[0];
        return user;
    },
    new: function(data, files) {
        let images = [];
        files.forEach(element => images.push(element.filename));

        let users = this.all();
        let newUser = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            firstName: data.firstName,
            surName: data.surName,
            email: data.email,
            off: data.off,
            image: images,
            password: data.password
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
            fs.unlinkSync(path.resolve(__dirname, "../../public/images/productos/", data.deleteImage))
        }

        users.forEach(element => {
            if (element.id == id) {
                element.firstName = data.firstName,
                    element.surName = data.surName,
                    element.email = data.email,
                    element.off = data.off,
                    element.image = images,
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