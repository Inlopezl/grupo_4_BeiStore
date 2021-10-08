const product = require('../../models/api/productModelApi')

module.exports = {
    datosGenerales: async(req, res) => {
        const productos =await product.findAll(req)
        const categorias = await product.findAllCategories()
        let datoCategories = {}
        categorias.forEach(categoria => {
            datoCategories[categoria.name] = categoria.products.length
        })
        let resultado = {
            count: productos.length,
            countByCategory: datoCategories,
            products: productos
        }

        return res.send(JSON.stringify(resultado))
    },
    detelles: async (req, res) => {
        const producto = await product.findOne(req.params.id, req)
        return res.send(JSON.stringify(producto))
    },
    enviarImagen: async(req, res) => {
        const image = await product.findImage(req.params.name, req.params.id)
        if (image) {
            return res.sendFile(image);
        }
        return res.send({error: 'imagen no encontrada'})
    }
}