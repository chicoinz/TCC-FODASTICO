const express = require('express');
const session  = require('express-session');

const app = express();

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const flash = require('connect-flash');

const path = require('path');
app.use(express.static(path.join(__dirname, 'Front_End/Publico')));

const upload = require('./Banco_dados/imagens'); //multer

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
app.set("views", __dirname + "/Front_End/Views");

app.use('Scripts', express.static(path.join(__dirname, 'Front_End/Publico/Scripts')));
const rotaInicial = require('./Roots/initial_roots');
app.use('/', rotaInicial);

const prodRotas = require('./Roots/product_roots');
app.use('/produtos', prodRotas);

const userRotas = require('./Roots/user_roots');
app.use('/usuarios', userRotas);

const adminRotas = require('./Roots/admin_roots');
app.use('/admin', adminRotas);



module.exports = app;