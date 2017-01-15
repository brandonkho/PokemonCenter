var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Conversation = require('./models/messaging');
var Message = require('./models/messaging');

var index = require('./routes/index');
//var tasks = require('./routes/tasks');
var pokemon = require('./routes/pokemon');
var trash = require('./routes/trash');
var users = require('./routes/users');
var messaging = require('./routes/messaging');

var mongoose = require('mongoose');
mongoose.connect('')

var port = 3000;

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

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
//app.use('/api', tasks);
app.use('/api', pokemon);
app.use('/users', users);
app.use('/api', messaging);
// app.use('/api', trash);

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('views/index.html', { root: __dirname });
});






io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('message', function(msg){
    console.log('message: ' + msg);
  });

  socket.on('chat', function(data){
    socket.emit('dank', data);
    socket.broadcast.emit('dank', data);

    Conversation.findOne({
      $or : [
        {$and: [{person1: data.to}, {person2: data.from}]},
        {$and: [{person1: data.from}, {person2: data.to}]}
      ]
    }, function(err, conversation){
      if(err){
            throw err;
      }
      console.log(conversation);
      if(!conversation){
        var newConversation = Conversation({person1: data.from, person2: data.to});
        newConversation.save(function(err, conversation){
          if(err){
            throw err;
          }
          console.log(conversation);
          var newMessage = Message({msg: data.msg, _conversation: conversation._id, _username: data.from});
          newMessage.save(function(err, message){
                  if(err){
                      throw err;
                  }
                  Message.findOne({_id: message._id})
                  .populate('_conversation')
                  .exec(function(err, message){
                    console.log(message);
                  });
          });
          
        });

      }else{
          var newMessage = Message({msg: data.msg, _conversation: conversation._id, _username: data.from});
          newMessage.save(function(err, message){
                  console.log(message);
                  if(err){
                      throw err;
                  }
                  Message.findOne({_id: message._id})
                  .populate('_conversation')
                  .exec(function(err, message){
                    console.log(message._conversation._id);
                  });
          });
      }
    });


    // var newMessage = Message({msg: data.msg});
    // newMessage.save(function(err, message){
    //         if(err){
    //             throw err;
    //         }
    // });
    io.sockets.in(data.to).emit('new_msg', {to: data.to, from: data.from, msg: data.msg});
    io.sockets.in(data.from).emit('self_msg', {msg: data.msg});
  });

  socket.on('join', function (data) {
    socket.join(data.user.username); // We are using room of socket io
    console.log(data.user.username);
  });

  
});

http.listen(3000, function(){
  console.log('server started');
});