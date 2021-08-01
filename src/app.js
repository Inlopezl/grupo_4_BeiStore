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

//method override
const method = require('method-override');
app.use(method('_method'));

//rutas
const homeRouter = require('./routers/home');
app.use(homeRouter);

const productRouter = require('./routers/product');
app.use('/products', productRouter);

const userRouter = require('./routers/user');
app.use('/users',userRouter);

// ruta errores 
app.use((req, res, next) => {
    res.status(404).render('not-found');
    next();
})
