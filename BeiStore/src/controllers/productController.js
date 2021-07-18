module.exports = {
    indexCart: (req, res) => {
        res.render('products/productCart');
    },
    indexDetail: (req, res) =>{
        res.render('products/productDetail');
    },
    indexCreate: (req, res) => {
        res.render('products/productCreate');
    }
}