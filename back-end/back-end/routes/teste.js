var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Olá mundo!!');
});

let teste = require('./routes/teste')
app.use('/teste',teste)

module.exports = app;
