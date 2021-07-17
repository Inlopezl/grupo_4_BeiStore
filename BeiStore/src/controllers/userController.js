module.exports = {
    indexLogin: (req, res) =>{
        res.render('users/login');
    },
    indexRegister: (req, res) =>{
        res.render('users/register');
    }
}