var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Register
router.get('/register', function(req, res){
	res.render('register.html');
});

// Login
router.get('/login', function(req, res){
	res.render('login.html');
});

router.get('/dank', function(req, res){
	res.status(200).json({
	  status: 'thisworks'
	});
});

router.get('/username/:username', function(req, res, next){
    User.getUserByUsername(req.params.username, function(err, user){
    	if(err){
            res.send(err);
        }
        res.json(user);
    });
});

router.get('/currentuser', function(req, res){
	res.send(req.user);
});

router.post('/register', function(req, res){
	//var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	//req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		// res.render('register.html',{
		// 	errors:errors
		// });
		return res.status(500).json({
	        errors: errors
	    });
	}else{
		console.log('no');
		var newUser = new User({
			//name: name,
			email:email,
			username: username,
			password: password,
			fc: ''
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log('lebron james');
			req.logIn(user, function(err) {
		      if (err) {
		        return res.status(500).json({
		          err: 'Could not log in user'
		        });
		      }
		      console.log('logged in fam');
		      console.log(req.user);
		      return res.status(200).json({
		  		status: 'Registration successful!'
			  });
		    });
		});

		//req.flash('success_msg', 'You are registered and can now login');

		//res.redirect('/users/login');
		
		// passport.authenticate('local')(req, res, function () {
	 //      return res.status(200).json({
	 //        status: 'Registration successful!'
	 //      });
	 //    });
		
		console.log('yo?');
		
	}


});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Success!'
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res){
	req.logout();

	res.status(200).json({
	  status: 'Bye!'
	});
});

module.exports = router;