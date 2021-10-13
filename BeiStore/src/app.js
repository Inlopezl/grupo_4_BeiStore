const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
// server
app.listen(process.env.PORT || 8080, () => console.log("Server on http://localhost:8080"));
app.use(cors())

// set view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

//carpeta publica
app.use(express.static(path.resolve(__dirname, '../public')));

// express session
const session = require('express-session');
app.use(session({
    secret: 'Beistore',
    resave: false,
    saveUninitialized: true
}));

// cookies parse
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//user To logged
const userMw = require('./middlewares/users/userToLoggedMw');
app.use(userMw);

//method override
const method = require('method-override');
app.use(method('_method'));


//rutas
const homeRouter = require('./routers/home');
app.use(homeRouter);

const productRouter = require('./routers/product');
app.use('/products', productRouter);

const userRouter = require('./routers/user');
app.use('/users', userRouter);

const apiUser = require('./routers/api/apiUsers');
app.use('/api/users', apiUser);

const productUser = require('./routers/api/apiProducts');
app.use('/api/products', productUser);

// ruta errores 
app.use((req, res, next) => {
    res.status(404).render('not-found');
    next();
})