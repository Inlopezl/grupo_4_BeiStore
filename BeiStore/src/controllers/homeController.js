const modelProduct = require('../models/products');

const homeController = {
    index:(req, res)=>{
        res.render('home.ejs', {productos: modelProduct.all().filter(element => element.category.includes('destacado')), titleProduct: 'Productos destacados'});
    },
}

module.exports = homeController;