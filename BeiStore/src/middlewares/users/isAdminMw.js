module.exports = (req, res, next) =>{
    console.log();
    if (req.session.userLogged.type_id != 2) {
        return res.redirect('/error')
    }
    next();
}