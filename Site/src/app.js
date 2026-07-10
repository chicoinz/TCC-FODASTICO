const express = require('express');
const session  = require('express-session');

const app = express();

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const flash = require('connect-flash');

const path = require('path');
app.use(express.static(path.join(__dirname, 'Front_end', 'Publico')));

const upload = require('./Back_end/Data_Base/images'); //multer

app.use(session({
 secret: 'chave-secreta-bem-dificil', // usada para assinar o ID da sessão
 resave: false,
 saveUninitialized: true,
 cookie: { maxAge: 3600000 } // duração da sessão (1 hora)
}));

app.use(flash());

// Configurando middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configurando EJS como motor de visualização
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'Front_end', 'View'));

app.use('/Scripts', express.static(path.join(__dirname, 'Front_end', 'Publico', 'Scripts')));
const rotaInicial = require('./Roots/initial_roots');
app.use('/', rotaInicial);

const prodRotas = require('./Roots/product_roots');
app.use('/produto', prodRotas);

const cartRotas = require('./Roots/cart_roots');
app.use('/carrinho', cartRotas);

const userRotas = require('./Roots/user_roots');
app.use('/usuario', userRotas);

const adminRotas = require('./Roots/admin_roots');
app.use('/admin', adminRotas);



module.exports = app;