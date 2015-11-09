var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// Mongo DB
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://glelan:lonywolfylog4420@ds051524.mongolab.com:51524/lone_wolf');

var routes = require('./routes/index');
var jeu = require('./routes/jeu');
var page = require('./routes/page');
var personnage = require('./routes/personnage');
var combat = require('./routes/combat');
var choixAleatoire = require('./routes/choix_aleatoire');
var recuperer_personnage = require ('./routes/recuperer_personnage');
var avancement = require ('./routes/avancement');
 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session init
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/jeu/', jeu);
app.use('/page/', page);
app.use('/', personnage);
app.use('/', combat);
app.use('/', choixAleatoire);
app.use('/', recuperer_personnage);
app.use('/', avancement);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
