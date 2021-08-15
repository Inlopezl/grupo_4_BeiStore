const user = require('../models/users');


module.exports = {
    indexLogin: (req, res) => {
        res.render('users/login');
    },

    indexDetail: (req, res) => {
        res.render('users/detail', { user: user.one(req.params.id) });
    },

    indexRegister: (req, res) => {
        res.render('users/register');
    },

    indexEdit: (req, res) => {
        res.render('users/form', { action: `/users/update/${product.one(req.params.id).id}?_method=PUT`, typePage: 'edit', title: 'Editar usuario', user: user.one(req.params.id) });
    },

    save: (req, res) => {
        console.log(req.body);
        let newUser = user.new(req.body, req.file);
        if(!newUser){
            return res.render('users/register', {
                errores: {
                    msg: 'El usuario ya se escuentra registrado'
                }
            })
        }
        return newUser == true ? res.redirect('/home') : res.send('Error');
    },
    update: (req, res) => {
        let editUser = user.edit(req.body, req.file, req.params.id);
        return editUser == true ? res.redirect('/home') : res.send('Error, no se pudo editar');
    },
    delete: (req, res) => {
        let deleteUser = user.delete(req.params.id);
        return deleteUser == true ? res.redirect('/home') : res.send('Error, no se pudo eliminar');
    }

}