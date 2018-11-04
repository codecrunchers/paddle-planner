var http = require('http')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
const healthRouter  = require('./routes/health');
const tripsRouter  = require('./routes/trips');

var UserModel = require('./models/userModel');
var app = express();


app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set('port', process.env.PORT || 3000)
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

app.on('ready', function() { 
    app.listen(3000, function(){ 
        console.log("app is ready"); 
    }); 
}); 


passport.use(new LocalStrategy(
  function(username, password, done) {

      UserModel.findOne({
        username: username
      }, function(err, user) {
        if (err) {
          console.log(err);
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        if (user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      });
  }
));


app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/trips?username='+req.user.username);
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
const dbusername=process.env.APP_MONGO_USER;
const dbpassword=process.env.APP_MONGO_PASS;
const db = process.env.APP_MONGO_DB;
mongoose.connect('mongodb://'+dbusername+':'+dbpassword+'@mongo/'+db, { useNewUrlParser: true });
mongoose.connection.once('open', function() { 
    app.emit('ready'); 
});

module.exports = app;
