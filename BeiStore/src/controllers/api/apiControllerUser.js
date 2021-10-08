const user = require('../../models/api/userModelApi');

module.exports = {
    datosGenerales :async (req, res) => {
        const users = await user.findAll(req)
        let resultado = {
            count: users.length,
            users
        }
        return res.send(JSON.stringify(resultado))
    },
    detalle: async (req, res) => {
        const usuario = await user.findOne(req.params.id)
        return res.send(usuario)
    }
}