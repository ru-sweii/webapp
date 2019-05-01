var mongoose = require('mongoose');
var StockSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  high: {
    type: Number
  },
  low: {
    type: Number
  },
  open: {
    type: Number
  },
  close: {
    type: Number
  },
  volume: {
    type: Number
  },
});
var Stock = mongoose.model('liv_stocks', StockSchema);
module.exports = Stock;