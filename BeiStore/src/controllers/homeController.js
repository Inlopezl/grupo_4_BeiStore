const modelProduct = require('../models/products');

const homeController = {
    
    index:async(req, res)=>{
        try {
            const categories = await modelProduct.category()
            const result = categories.map(category => category.name)
            console.log(result);
            const product = await modelProduct.all()
            return res.render('home.ejs', {productos: product, titleProduct: 'Productos destacados', categories: result});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = homeController;