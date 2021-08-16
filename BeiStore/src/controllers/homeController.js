const modelProduct = require('../models/products');

const homeController = {
    index:(req, res)=>{
        console.log(req.session.userLogged);
        res.render('home.ejs', {productos: modelProduct.all().filter(element => element.category.includes('destacado')), titleProduct: 'Productos destacados',
        userLogged: req.session.userLogged
        
    });
    },
}

module.exports = homeController;