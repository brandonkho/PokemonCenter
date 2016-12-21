var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var pokemon = require('./routes/pokemon');
var trash = require('./routes/trash');
var users = require('./routes/users');

var mongoose = require('mongoose');
mongoose.connect('')

var port = 3000;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', index);
app.use('/api', tasks);
app.use('/api', pokemon);
app.use('/users', users);
// app.use('/api', trash);

app.listen(port, function(){
	console.log('server started');
})