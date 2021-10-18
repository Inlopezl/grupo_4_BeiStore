const user = require('../../models/api/userModelApi');

module.exports = {
    datosGenerales :async (req, res) => {
        const users = await user.findAll(req)
        let resultado = {
            count: users.length,
            users,
            lastUser: users[users.length-1],
        }
        return res.send(JSON.stringify(resultado))
    },
    detalle: async (req, res) => {
        const ruta = req.protocol + '://' + req.get('host') + req.originalUrl 
        const usuario = await user.findOne(req.params.id, ruta)
        return res.send(usuario)
    },
    enviarImagen: async(req, res) => {
        const image = await user.findImage(req.params.name, req.params.id)
        if (image) {
            return res.sendFile(image);
        }
        return res.send({error: 'imagen no encontrada'})
    }
}