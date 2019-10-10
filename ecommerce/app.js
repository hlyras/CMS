const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();

const bodyParser = require('body-parser');

const routes = require('./app/routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'app/view'));
app.set('view engine', 'ejs');

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Headers', 'Authorization');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

module.exports = app;