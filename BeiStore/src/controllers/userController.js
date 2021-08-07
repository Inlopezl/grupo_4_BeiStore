const users = require('../models/users');
const { validationResult } = require('express-validator');

module.exports = {
    indexLogin: (req, res) => {
        res.render('users/login');
    },
    indexRegister: (req, res) => {
        res.render('users/register');
    }
}