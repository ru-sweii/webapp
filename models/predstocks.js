var mongoose = require('mongoose');
var PredStockSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  result: {
    type: Number
  }
});
var PredStock = mongoose.model('pred_stocks', PredStockSchema);
module.exports = PredStock;