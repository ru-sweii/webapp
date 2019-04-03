var express = require('express');
var router = express.Router();

var User = require('../models/user')

router.post('/login', function(req, res, next) {

  if(req.body.username && req.body.password) {
  	var username = req.body.username;
  	var password = req.body.password;

  	User.findOne({username: username, password: password}, function(err, user){
  		if(err) next(err);

  		if(!user) {
  			res.render('login', {title: 'System login', message: 'username/password mismatched', message_type: 'alert alert-danger'});
  		}
  		else {
  			req.session.username = username;
		  	req.session.loggedin = true;
		  	req.session.priority = user.priority;
        req.session.user = user;
		  	res.redirect('/dashboard');
  		}
  	});
  }
  else{
  	res.send('Forbidden');
  }
  
});

router.get('/signup', function(req, res, next){
  res.render('signup', {title: 'User Signup page'});
});

var mongoose = require('mongoose');

router.post('/signup', function(req, res, next) {
  if(req.body.username && req.body.password && req.body['password-repeat']) {

    if(req.body.password != req.body['password-repeat']) {
      next(new Error('password mismatched'));
      return;
    }
    User.create({username: req.body.username, password: req.body.password, priority: 2, interests: ['GOOG', 'AABA'], _id: req.body.username}, function(err, user){
      if(err) {
        next(err);
        return;
      }

        res.redirect('/users/login');
    });
  }
  else{res.send('Forbidden');}
  
});

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login', {title: 'System login', message: '', message_type: ''});
});

router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/users/login');
      }
    });
  }
});

router.post('/change_priority', function(req, res, next) {
  if(req.session.loggedin && req.session.priority == 0 && req.body.username && req.body.priority) {

    var username = req.body.username;
    var priority = req.body.priority;

    if(priority == -1) {

      User.deleteOne({username: username}).exec(function(err){
        if(err) {
          console.log(err);
          next(err);
          return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send({status: 0, success: true});
      })

    } else {
      User.updateOne({username: username}, {priority: priority}).exec(function(err, result){
        if(err) {
          next(err);
          return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send({status: 0, success: true, result: result});
      });
    }
  }
  else{res.send('Forbidden');}
  
});


router.get('/', function(req, res, next){
	res.send('Unfinished');
});

module.exports = router;
