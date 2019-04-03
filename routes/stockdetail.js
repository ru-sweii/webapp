var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Stock = require('../models/stocks')

router.get('/:symbol', function(req, res, next){

	if(req.session.loggedin) {

		res.render('stockdetail', {symbol: req.params.symbol, username: req.session.username});

	} else {
		res.redirect('/users/login');
	}

});

router.post('/', function(req, res, next){

	if(req.session.loggedin && req.body.symbol) {

		Stock.find({symbol: req.body.symbol}).exec(function(err, results){
			if(results.length == 0)
				next(new Error('Symbol not exists'));
			else {
				if(req.session.user.interests.indexOf(req.body.symbol) == -1) {
					req.session.user.interests.push(req.body.symbol);

					User.updateOne({username: req.session.username}, {interests: req.session.user.interests}, function(err, user){
						if(err) {
							next(err);
							return;
						}
						req.session.user = user;
						res.redirect('/stockdetail/' + req.body.symbol);
					})

				} else {
					res.send('Forbidden');
				}


				


			}
		})

	} else {
		res.redirect('/users/login');
	}

});

module.exports = router;
