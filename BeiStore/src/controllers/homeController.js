const modelProduct = require('../models/products');

const homeController = {
    
    index:async(req, res)=>{
        try {
            const product = await modelProduct.all()
            return res.render('home.ejs', {productos: product, titleProduct: 'Productos destacados'});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = homeController;