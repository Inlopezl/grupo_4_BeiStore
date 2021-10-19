const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const { Users } = db

models = {
    directory: function() {
        let directory = path.resolve(__dirname, "../data/users.json");
        return directory;
    },
    findAll: async () => {
        try {
            const users = await Users.findAll()
            return users
        } catch (error) {
            console.log(error);
        }
    },

    findByPk: async(id) => {
        try {
            const user = await Users.findByPk(id,{
                include: [{association: 'type'}]
            })
            return user;    
        } catch (error) {
            console.log(error);
        }
    },
    findByEmail: async (text) => {
        try {
            const user = await Users.findAll({
                where:{
                    email: text
                }
            })
            return user.pop();    
        } catch (error) {
            console.log(error);
        }
    },
    findByFieldGroup: function(field, text){
        let users = this.findAll();
        const user = users.filter(element => element[field].includes(text));
        return user != undefined ? user: false;
    },
    new: (data, file)=> {
        const admins = ['erik.sucasai@gmail.com']
        let encontro = false
        admins.forEach(email =>{
            const regex = new RegExp(email, "gi");
            if(regex.test(data.email)){
                encontro = true
            }
        })
        Users.create({
            firstName: data.firstName,
            surName: data.surName,
            avatar: file != undefined? file.filename : "avatar_default.jpg",
            email: data.email,
            password: bcrypt.hashSync(data.password, 10),
            type_id: encontro? 2: 1
        })
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

    // FUNCIONES PARA LA API 
    dato: async () => {
        const usuariosdb = await Users.findAll()
        let usuariosFinales = []
        usuariosdb.forEach( usuario => {
            usuariosFinales.push({
                id: usuario.id,
                firstName: usuario.firstName,
                surName: usuario.surName,
                avatar: usuario.avatar,
                email: usuario.email,
                type_id: usuario.type_id
            })
        })
        return usuariosFinales
    },
    
}
module.exports = models;