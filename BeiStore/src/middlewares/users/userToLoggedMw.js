const user = require('../../models/users');
module.exports = async (req, res, next) =>{
    res.locals.isLogged = false;
    if(req.cookies.userEmail){
        let userLogged = await user.findByEmail(req.cookies.userEmail);
        req.session.userLogged = userLogged;
    }

    if(req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();
}