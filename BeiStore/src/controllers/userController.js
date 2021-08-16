const user = require('../models/users');
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
        res.render('users/form', { action: `/users/update/${product.one(req.params.id).id}?_method=PUT`, typePage: 'edit', title: 'Editar usuario', user: user.one(req.params.id) });
    },

    save: (req, res) => {
        let newUser = user.new(req.body, req.file);
        if(!newUser){
            return res.render('users/register', {
                errores: {
                    msg: 'El usuario ya se escuentra registrado'
                }
            })
        }
        return newUser == true ? res.redirect('/users/login') : res.send('Error');
    },
    loginProcess: (req, res) =>{
        let userToLogin = user.findByField('email', req.body.email);
        if(userToLogin){
            if(bcrypt.compareSync( req.body.password ,userToLogin.password)){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                res.redirect('/users/profile')
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
        req.session.destroy();
        return res.redirect('/home');
    }
}