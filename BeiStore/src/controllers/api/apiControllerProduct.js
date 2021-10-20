const product = require('../../models/api/productModelApi')


module.exports = {
    datosGenerales: async(req, res) => {
        const productos = await product.findAll(req)
        const categorias = await product.findAllCategories()
        let datoCategories = []
        categorias.forEach(categoria => {
            let category = {name: categoria.name, countCat: categoria.products.length}
            datoCategories.push(category)
        })
        let resultado = {
            count: productos.length,
            countByCategory: datoCategories,
            products: productos,
            lastProduct: productos[productos.length - 1] 
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