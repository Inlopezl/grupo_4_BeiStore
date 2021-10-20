const db = require('../../database/models');
const { Users } = db
const path = require('path')
const models = {
    findAll: async (req) => {
        try {
            const users = await Users.findAll();
            let resultado = []
            users.forEach( user => {
                resultado.push({
                    id: user.id,
                    firstName: user.firstName,
                    email: user.email,
                    avatar: "http://localhost:8080/images/avatars/"+user.avatar,
                    detail: req.protocol + '://' + req.get('host') + req.originalUrl + user.id
                })
            });
            return resultado
        } catch (error) {
            console.log(error);
        }
    },
    findOne: async (id, ruta) => {
        try {
            const user = await Users.findByPk(id)
            console.log(user);
            let resultado = {}
            if(user){
                resultado.id = user.id
                resultado.firstName = user.firstName,
                resultado.surName = user.surName,
                resultado.avatar = ruta + '/image/' + user.avatar,
                resultado.email = user.email
            } else {
                resultado.error = 'Usuario no encontrado'
            }
            return resultado
        } catch (error) {
            console.log(error);
        }
    },
    findImage: async (name, id) => {
        try {
            const usuario = await Users.findByPk(id)
            let image = usuario.avatar
            if(image == name){
                return path.resolve(__dirname, `../../../public/images/avatars/`, name)
            } else 
            return false
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = models