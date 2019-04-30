var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Stock = require('../models/stocks')
var Advisor = require('../models/advisor')

router.get('/:symbol', function(req, res, next){

	if(req.session.loggedin) {
		if(req.session.priority == 1) {
			res.render('stockdetail_advisor', {symbol: req.params.symbol, username: req.session.username});
		}
		else {
			res.render('stockdetail', {symbol: req.params.symbol, username: req.session.username});
		}
		

	} else {
		res.redirect('/users/login');
	}
});

router.post('/:symbol', function(req, res, next){
  if(req.session.username && req.body.subtitle && req.body.description) {
  	var currentUnixTime = Date.now();
    Advisor.create({advisorname: req.session.username, symbol: req.params.symbol, subtitle: req.body.subtitle, description: req.body.description, time: currentUnixTime}, function(err, advisor){
      if(err) {
        next(err);
        return;
      }
      res.render('stockdetail_advisor', {symbol: req.params.symbol, username: req.session.username});
    });

  }
  else{res.send('Forbidden');console.log(req.body.subtitle);console.log(req.body.description)}
});
module.exports = router;
