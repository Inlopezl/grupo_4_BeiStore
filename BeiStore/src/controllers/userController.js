const user = require('../models/users');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

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
        res.render('users/register', { action: `/users/update/${product.one(req.params.id).id}?_method=PUT`, typePage: 'edit', title: 'Editar usuario', user: user.one(req.params.id) });
    },

    save: (req, res) => {
        let error = validationResult(req);
        if (error.errors.length > 0) {
            return res.render("users/register"), { errors: error.mapped() }
            
        } else {
            let newUser = user.new(req.body, req.file);
            return newUser == true ? res.redirect('/users/login') : res.send('Error');
        } 
    },
    loginProcess: (req, res) =>{
        let userToLogin = user.findByField('email', req.body.email);
        if(userToLogin){
            if(bcrypt.compareSync( req.body.password ,userToLogin.password)){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                if(req.body.remember != undefined){
                    res.cookie('userEmail', req.body.email, { maxAge : 1000 * 60 * 3 });
                }
                return res.redirect('/users/profile')
            } else {
                return res.render('users/login', {
                    errores: {
                        email:{
                            msg:'Las credenciales son erroneas'
                        },
                        password:{
                            msg:'Las credenciales son erroneas'
                        }
                    },
                    oldData: req.body
                })
            }
        } else{
            res.render('users/login', {
                errores:{
                    email:{
                        msg:'Email no resgistrado.'
                    }
                }
            })
        }
    },
    update: (req, res) => {
        let editUser = user.edit(req.body, req.file, req.params.id);
        return editUser == true ? res.redirect('/home') : res.send('Error, no se pudo editar');
    },
    delete: (req, res) => {
        let deleteUser = user.delete(req.params.id);
        return deleteUser == true ? res.redirect('/home') : res.send('Error, no se pudo eliminar');
    },
    profile:(req, res) =>{ 
        res.render('users/profile', {
            userLogged: req.session.userLogged
        })
    },
    logout:(req, res) => {
        res.clearCookie('userEmail', { path: '/' });
        req.session.destroy();
        return res.redirect('/home');
    }

}