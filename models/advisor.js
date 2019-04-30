var mongoose = require('mongoose');
var AdvisorSchema = new mongoose.Schema({
  advisorname: {
    type: String,
    required: true,
    trim: true
  },
  symbol: {
    type: String
  },
  time: {
    type: Date,
    required: true,
  },
  subtitle: {
    type: String
  },
  description: {
    type: String
  }
});
var Advisor = mongoose.model('Advisor', AdvisorSchema);
module.exports = Advisor;