var express = require('express');
var router = express.Router();

var stocks = require('../models/stocks');
var user = require('../models/user');
var advisor = require('../models/advisor');
var predstocks = require('../models/predstocks');

router.post('/', function(req, res, next) {
	var err = new Error('Not authorized');
	err.status = 401;
	next(err);
});

router.get('/his_data', function(req, res, next){
	if(req.session.loggedin){
		if(req.query.symbol == null || req.query.maxn == null) {
	        res.send('Invalid request');
	        return;
	    }
	    var query = stocks.find({symbol: req.query.symbol}).sort({'timestamp': -1}).limit(parseInt(req.query.maxn));
	    query.exec(function(err, results){
	        if(err) next(err);
	        res.setHeader('Content-Type', 'application/json');
	        res.send(JSON.parse(JSON.stringify(results)));
	    });
	} else {
		var err = new Error('Not authorized');
		err.status = 401;
		next(err);
	}
});

router.get('/symbols', function(req, res, next){
	if(req.session.loggedin){
	    var query = stocks.find().distinct('symbol');
	    query.exec(function(err, results){
	        if(err) next(err);
	        res.setHeader('Content-Type', 'application/json');
	        res.send(JSON.parse(JSON.stringify(results)));
	    });
	} else {
		var err = new Error('Not authorized');
		err.status = 401;
		next(err);
	}
});

router.get('/userlist', function(req, res, next){
	if(req.session.loggedin && req.session.priority == 0){
	    var query = user.find().sort({'priority': 1});
	    query.exec(function(err, results){
	        if(err) next(err);
	        res.setHeader('Content-Type', 'application/json');
	        res.send(JSON.parse(JSON.stringify(results)));
	    });
	} else {
		var err = new Error('Not authorized');
		err.status = 401;
		next(err);
	}
});

router.get('/userprofile', function(req, res, next){
	if(req.session.loggedin) {
		var query = user.findOne({username: req.session.username});
		query.exec(function(err, result){
			if(err) next(err);
			res.setHeader('Content-Type', 'application/json');
	        res.send({username: result.username, interests: result.interests});
		});

	} else {
		var err = new Error('Not authorized');
		err.status = 401;
		next(err);
	}
});

router.get('/neweststock', function(req, res, next){
	if(req.session.loggedin && req.query.symbol) {
		var query = stocks.findOne({symbol: req.query.symbol}).sort({timestamp: -1});
		query.exec(function(err, result){
			if(err) next(err);
			res.setHeader('Content-Type', 'application/json');
	        res.send(result);
		});

	} else {
		var err = new Error('Not authorized');
		err.status = 401;
		next(err);
	}
});

function w_avg(w, a, b) {return w * a + (1 - w) * b;}

router.get('/stockprediction', function(req, res, next){
	if(req.session.loggedin && req.query.symbol) {
		var query = predstocks.find({symbol: req.query.symbol});
		query.exec(function(err, result){
			if(err){
				 next(err);
				 return;
			}
			if(!result) {
				next(new Error("Stock not exists"));
				return;
			}

			res_result = {'symbol': req.query.symbol}

			for (var i = 0; i < result.length; i++) {
				res_result[result[i].method] = result[i].result;
			}

			res.setHeader('Content-Type', 'application/json');
	        res.send(res_result);
		});

	} else {
		var err = new Error('Not authorized');
		err.status = 401;
		next(err);
	}
});

router.post('/subscribestock', function(req, res, next){
	if(req.session.loggedin && req.body.symbol) {

		var query = stocks.findOne({symbol: req.body.symbol}).sort({timestamp: -1});
		query.exec(function(err, result){

			if(err){
				 next(err);
				 return;
			}
			if(!result) {
				next(new Error("Stock not exists"));
				return;
			}

			res.setHeader('Content-Type', 'application/json');

			if(req.session.user.interests.indexOf(req.body.symbol) == -1) {
				req.session.user.interests.push(req.body.symbol);

				user.updateOne({username: req.session.username}, {interests: req.session.user.interests}, function(err, n_user){
					

					if(err) {
						res.send({status: -1, success: false, err: err});
						console.log(err);

					}
					else {
						res.send({status: 0, success: true});
					}
				});
			} else {
				res.send({status: -1, success: true});
			}

		});

	} else {
		var err = new Error('Not authorized');
		err.status = 401;
		next(err);
	}
});

router.post('/unsubscribestock', function(req, res, next){
	if(req.session.loggedin && req.body.symbol) {
		res.setHeader('Content-Type', 'application/json');

		var query = stocks.findOne({symbol: req.body.symbol}).sort({timestamp: -1});
		query.exec(function(err, result){
			if(err) next(err);
			if(!result) {
				next(new Error("Stock not exists"));
				return;
			}

			if(req.session.user.interests.indexOf(req.body.symbol) == -1)
				res.send({status: -1, success: true});
			else {

				var n_interests = [];
				for(var i = 0; i < req.session.user.interests.length; i ++)
					if(req.body.symbol != req.session.user.interests[i])
						n_interests.push(req.session.user.interests[i]);

				user.updateOne({username: req.session.username}, {interests: n_interests}, function(err, n_user){
					if(err) {
						res.send({status: -1, success: false, err: err});
					}
					else {
						req.session.user.interests = n_interests;
						res.send({status: 0, success: true});
					}
				});
			}

			
		});

	} else {
		var err = new Error('Not authorized');
		err.status = 401;
		next(err);
	}
});

router.get('/showcomment', function(req, res, next){
	if(req.session.loggedin && req.query.symbol) {
		var query = advisor.find({symbol: req.query.symbol}).sort({'time': -1}).limit(3);
		query.exec(function(err, results){

	  	if(err) next(err);
	        res.setHeader('Content-Type', 'application/json');
	        res.send(JSON.parse(JSON.stringify(results)));
	    });
	} else {
		var err = new Error('Not authorized');
		err.status = 401;
		next(err);
	}
});
module.exports = router;
