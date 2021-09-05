const db = require('../database/models');


module.exports = {
    test: (req, res) => {
        db.Products.findAll()
        .then(element => {
            res.send(element)
        })
        
        
    }
}