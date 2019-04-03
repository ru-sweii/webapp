var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/web568');

var User = require('./models/user');

User.find({username: 'customer'}).then(function(result){
	console.log(result);

	result[0].interests.push('GOOG');
	result[0].interests.push('AABA');
	result[0].save();

	mongoose.close();
});