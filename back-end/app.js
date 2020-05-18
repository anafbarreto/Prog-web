var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const db = require('./config/database')
db('mongodb://localhost:27017/4not2020')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

let teste = require('./routes/teste')
app.use('/teste', teste)

const editora = require('./routes/editora')
app.use('/editora', editora)

const produto = require('./routes/produto')
app.use('/produto', produto)

const cliente = require('./routes/cliente')
app.use('/cliente', cliente)

const venda = require('./routes/venda')
app.use('/venda', venda)

const item_venda = require('./routes/item_venda')
app.use('/item-venda', item_venda)

const emprestimo = require('./routes/emprestimo')
app.use('/emprestimo', emprestimo)

module.exports = app;