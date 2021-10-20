const db = require('../../database/models');
const { Products } = db
const path = require('path')
const models = {
    findAll: async (req) =>{
        try {
            const products = await Products.findAll({
                include: [{association: 'categories'},{association: 'brand'}, {association: 'images'}]
            })
            const result = []
            products.forEach( product => {
                result.push({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    brand: product.brand.name,
                    categories: product.categories.map(categoria => categoria.name),
                    image: "http://localhost:8080/images/productos/"+product.images[0].name,
                    detail: "http://localhost:8080/products/"+product.id,
                    Apidetail: req.protocol + '://' + req.get('host') + req.originalUrl + product.id
                })
            })
            return result
        } catch (error) {
            console.log(error);
        }
    },
    findAllCategories: async () => {
        try {
            const categories = await db.Categories.findAll({
                include: [{association: 'products'}]
            })
            return categories
        } catch (error) {
            console.log(error);
        }
    },
    findOne: async (id, req) => {
        try {
            const producto = await Products.findByPk(id,{
                include: [{association: 'categories'},{association: 'brand'},{association: 'images'}]
            })
            let final = {
                id: producto.id,
                name: producto.name,
                off: producto.off,
                price: producto.price,
                sales: producto.sales,
                description: producto.description,
                brand: producto.brand.name,
                categories: producto.categories.map(categoria => categoria.name),
                images: producto.images.map(img => {
                   return req.protocol + '://' + req.get('host') + req.originalUrl + '/image/' + img.name
                }),
            }
            return final
        } catch (error) {
            console.log(error);
        }
    },
    findImage: async (name, id) => {
        try {
            const product = await Products.findByPk(id,{include: [{association: 'images'}]})
            let images = product.images
            images = images.map(img => img.name) 
            if(images.includes(name)){
                return path.resolve(__dirname, `../../../public/images/productos/`, name)
            } else 
            return false
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = models