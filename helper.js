var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/web568');
var User = require('./models/user');
var Advisor = require('./models/advisor')
User.create({
    username: 'customer',
    password: 'customer',
    priority: 2,
    _id: 'customer'
}).then(function(err) {
    console.log(err);
    mongoose.close();
});
User.create({
    username: 'advisor',
    password: 'advisor',
    priority: 1,
    _id: 'advisor'
}).then(function(err) {
    console.log(err);
    mongoose.close();
});
User.create({
    username: 'admin',
    password: 'admin',
    priority: 0,
    _id: 'admin'
}).then(function(err) {
    console.log(err);
    mongoose.close();
});
//var query = Advisor.find();
//  query.exec(function(err, results){
//          if(err) next(err);
//          console.log((JSON.parse(JSON.stringify(results))));
//      });
function write_fake_comment_for(symbol) {
    for (var i = 0; i < 3; i++) {
        var username = "Advisor-" + (i);
        var subtitle = "Individual Advisor/Expert    xxxx@gmail.com";
        var description = "This is a comment for " + symbol + " created by " + "Advisor-" + (i) + ", just for demonstration";
        Advisor.create({
            advisorname: username,
            symbol: symbol,
            subtitle: subtitle,
            description: description,
            time: Date.now()
        }).then(function(result) {
            console.log(result);
        });
    }
}
var symbols = ["AABA", "C", "INTC", "GOOG", "GS", "BAC", "USB", "JPM", "WFC", "PFE"];
for (var i = 0; i < symbols.length; i++) {
    write_fake_comment_for(symbols[i]);
}