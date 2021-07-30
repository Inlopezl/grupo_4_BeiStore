const modelProduct = require('../models/products');

const homeController = {
    index:(req, res)=>{
        res.render('home.ejs', {productos: modelProduct.all().filter(element => element.categoria.includes('destacado')), titleProduct: 'Productos destacados'});
    },
}

module.exports = homeController;