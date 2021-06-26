const express = require('express');
const router = express.Router();
const path = require('path');


// Routers 
router.get('/home', (req, res)=> res.sendFile(path.resolve(__dirname, '../views', 'home.html')));
router.get('/', (req, res)=> res.sendFile(path.resolve(__dirname, '../views', 'home.html')));
router.get('/productDetail', (req, res)=> res.sendFile(path.resolve(__dirname, '../views', 'productDetail.html')));
router.get('/productCart', (req, res)=> res.sendFile(path.resolve(__dirname, '../views', 'productCart.html')));
router.get('/register', (req, res)=> res.sendFile(path.resolve(__dirname, '../views', 'register.html')));
router.get('/login', (req, res)=> res.sendFile(path.resolve(__dirname, '../views', 'login.html')));

module.exports = router;