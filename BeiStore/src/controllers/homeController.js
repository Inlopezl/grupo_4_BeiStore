const modelProduct = require('../models/products');

const homeController = {
    index:(req, res)=>{
        res.render('home.ejs', {productos: modelProduct.all().filter(element => element.categoria.indexOf('destacado') != -1)});
    },
}

module.exports = homeController;