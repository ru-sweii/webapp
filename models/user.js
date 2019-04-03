var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  interests:[
    {type: String}
  ],
  priority:{
    type: Number,
    required: true
  },
  _id:{
    type: String,
    required: true
  }
},  { _id: false });
var User = mongoose.model('User', UserSchema);
module.exports = User;