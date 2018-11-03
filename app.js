var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const passport = require('passport');


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
const healthRouter  = require('./routes/health');
const tripsRouter  = require('./routes/trips');


const mongoUsername=process.env.APP_MONGO_USER;
const mongoPassword=process.env.APP_MONGO_PASS;

var User = require('./models/user');

var app = express();
app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/health', healthRouter);
app.use('/login', loginRouter);
app.use('/trips', tripsRouter);


app.get('/loginSuccess', (req, res) => res.send("Welcome "+req.query.username+"!!"));
app.get('/loginFail', (req, res) => res.send("Login Failure"));

app.post("/login", (req, res) => {
  passport.authenticate("local")(req, res, function(){
    res.redirect("/trips");       
  });     
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Passport Utils
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});

//Initialise Data Store

module.exports = app;
