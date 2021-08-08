const user = require('../models/users');
const { validationResult } = require('express-validator');

module.exports = {
    indexLogin: (req, res) => {
        res.render('users/login');
    },

    indexDetail: (req, res) => {
        res.render('users/detail', { user: user.one(req.params.id) });
    },

    indexRegister: (req, res) => {
        res.render('users/register', { action: '/users/save', typePage: 'create', title: 'Crear un usuario' });
    },

    indexEdit: (req, res) => {
        res.render('users/form', { action: `/users/update/${product.one(req.params.id).id}?_method=PUT`, typePage: 'edit', title: 'Editar usuario', user: user.one(req.params.id) });
    },

    save: (req, res) => {
        let error = validationResult(req)
        console.log(req.body);
        // if (!error.isEmpty()) {
        //     res.render('users/form', { action: '/users/save', typePage: 'create', title: 'Crear un usuario', errores: error.mapped() })
        // } else  
        let newUser = user.new(req.body, req.file);

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