var express = require('express');
var router = express.Router();

var stocks = require('../models/stocks');
var livstocks = require('../models/stocks');
var user = require('../models/user');
var advisor = require('../models/advisor');
var predstocks = require('../models/predstocks');


router.get('/latest_stock', function(req, res, next){

	// [liv] latest 1 record for given symbol
	res.setHeader('Content-Type', 'application/json');

	if(req.query.symbol) {
		var query_symbol = req.query.symbol;
		var query = livstocks.find({symbol: query_symbol}).sort({timestamp: -1}).limit(1);
		query.exec(function(err, results){
			if(err) {
				res.send({'err': err});
				next(err);
				return;
			}
			if(results.length == 0) {
				res.send({'err': 'no record found'});
				return;
			}
			res.send({symbol: query_symbol, result: results[0].open});
		});
	} else {
		res.send({status: -1, message: "Argument not enough"});
	}
});

router.get('/highest_stock', function(req, res, next){
	res.setHeader('Content-Type', 'application/json');

	// [his] highest stock price in last ten days
	if(req.query.symbol) {
		var query_symbol = req.query.symbol;
		var query = stocks.find({symbol: query_symbol}).sort({timestamp: -1}).limit(10);
		query.exec(function(err, results){
			if(err) {
				res.send({'err': err});
				next(err);
				return
			}
			if(results.length == 0){
				res.send({'err': 'no record found'});
				return;
			}

			var highest_price = results[0].high;

			for(var i = 0; i < results.length; i ++)
				highest_price = Math.max(highest_price, results[i].high);

			res.send({symbol: query_symbol, result: highest_price});
		});
	} else {
		res.send({status: -1, message: "Argument not enough"});
	}
});

router.get('/average_stock', function(req, res, next){
	res.setHeader('Content-Type', 'application/json');

	// [his] average stock price in last year
	if(req.query.symbol) {

		var query_symbol = req.query.symbol;
		var query = stocks.find({symbol: query_symbol}).sort({timestamp: -1}).limit(365);
		query.exec(function(err, results){
			if(err) {
				res.send({'err': err});
				next(err);
				return
			}
			if(results.length == 0){
				res.send({'err': 'no record found'});
				return;
			}

			var sum_results = 0.0;

			for(var i = 0; i < results.length; i ++)
				sum_results += results[i].close;

			res.send({symbol: query_symbol, result: sum_results / results.length});
		});
	} else {
		res.send({status: -1, message: "Argument not enough"});
	}
});

router.get('/lowest_stock', function(req, res, next){
	res.setHeader('Content-Type', 'application/json');

	// [his] lowest stock price in last year
	if(req.query.symbol) {

		var query_symbol = req.query.symbol;
		var query = stocks.find({symbol: query_symbol}).sort({timestamp: -1}).limit(365);
		query.exec(function(err, results){
			if(err) {
				res.send({'err': err});
				next(err);
				return
			}
			if(results.length == 0){
				res.send({'err': 'no record found'});
				return;
			}
			var lowest_price = results[0].low;

			for(var i = 0; i < results.length; i ++)
				lowest_price = Math.min(lowest_price, results[i].low);
			res.send({symbol: query_symbol, result: lowest_price});
		});
	} else {
		res.send({status: -1, message: "Argument not enough"});
	}
});


router.get('/', function(req, res, next) {
	res.render('squery');
});

router.get('/his_data', function(req, res, next){

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
});

router.get('/symbols', function(req, res, next){

	    var query = stocks.find().distinct('symbol');
	    query.exec(function(err, results){
	        if(err) next(err);
	        res.setHeader('Content-Type', 'application/json');
	        res.send(JSON.parse(JSON.stringify(results)));
	    });

});

router.get('/userlist', function(req, res, next){

	    var query = user.find().sort({'priority': 1});
	    query.exec(function(err, results){
	        if(err) next(err);
	        res.setHeader('Content-Type', 'application/json');
	        res.send(JSON.parse(JSON.stringify(results)));
	    });

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
		res.setHeader('Content-Type', 'application/json');
	    res.send({err: 'Cannot view a profile without login'});
	}


});

router.get('/neweststock', function(req, res, next){
	if(req.query.symbol) {
		var query = stocks.findOne({symbol: req.query.symbol}).sort({timestamp: -1});
		query.exec(function(err, result){
			if(err) next(err);
			res.setHeader('Content-Type', 'application/json');
	        res.send(result);
		});

	} else {
		var err = new Error('Argument not enough');
		err.status = 401;
		next(err);
	}
});



router.get('/stockprediction', function(req, res, next){
	if(req.query.symbol) {
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
		var err = new Error('Argument not enough');
		err.status = 401;
		next(err);
	}
});


module.exports = router;
