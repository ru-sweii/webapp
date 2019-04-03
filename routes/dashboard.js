var express = require('express');
var router = express.Router();
var user = require('../models/user');

router.get('/', function(req, res, next){
	if(req.session.loggedin) {

		if(req.session.priority >= 1) {
			res.render('customer', {title: 'Welcome, ' + req.session.username, username: req.session.username});
		}
		else if (req.session.priority == 0){
			res.render('admin', {title: 'Admin page' + req.session.username, username: req.session.username});
		}

		else {
			throw new Error('user role unfind');
		}

	} else {
		res.redirect('/users/login');
	}
});

router.post('/', function(req, res, next){
	if(req.session.loggedin) {
		if(!req.body.new_password){
			res.send('Invalid request');
		}
		else if(req.body.cur_password != req.session.user.password) {
			res.send('Current password incorrect');
		} else if(req.body.new_password != req.body.new_password_confirm) {
			res.send('Passwords not match');
		} else {
			user.updateOne({username: req.session.username}, {password: req.body.new_password}, function(err, u){
				if(err) {
					next(err);
					return;
				}
				req.session.user.password = req.body.new_password;
				res.redirect('/dashboard');
			});
		}

	} else {
		res.redirect('/users/login');
	}
});

module.exports = router;
