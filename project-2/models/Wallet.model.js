const { Schema, model } = require('mongoose');

const walletSchema = new Schema(
    {
      price: Number,
      symbol:String,
      priceChange:Number
      
    });
  
  const Wallet = model('Wallet', walletSchema);
  
  module.exports = Wallet;