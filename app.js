var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var registrants = {};

app.get('/', function (req, res) {
  res.send('backend api is up')
});

app.post('/signup', function (req, res) {

  var reg = {
    '_id': req.body.email,
    'name': req.body.name,
    'preview': req.body.previewAccess
  };

  if (registrants[reg._id] == null) {
    registrants[reg._id] = reg;
    res.status(201).end();
  } else {
    res.status(409).end();
  }

});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports.app = app;
