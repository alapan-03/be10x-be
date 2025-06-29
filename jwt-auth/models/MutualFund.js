const mongoose = require('mongoose');

const MutualFundSchema = new mongoose.Schema({
  schemeCode: {
    type: Number,
    required: true,
    unique: true
  },
  schemeName: {
    type: String,
    required: true
  },
  isinGrowth: String,
  isinDivReinvestment: String
});

module.exports = mongoose.model('MutualFund', MutualFundSchema);
