const express = require('express');
const router = express.Router();
const path = require('path');


// Routers 
router.get('/home', (req, res)=> res.sendFile(path.resolve(__dirname, '../views', 'home.html')));

module.exports = router;