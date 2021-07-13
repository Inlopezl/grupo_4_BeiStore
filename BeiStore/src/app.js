const express = require('express');
const app = express();
const path = require('path');
// server
app.listen(process.env.PORT || 3000,()=>console.log("Server on http://localhost:3000"));

// set view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

//carpeta publica
app.use(express.static(path.resolve(__dirname, '../public')));

const homeRouter = require('./routers/home');
app.use(homeRouter);

