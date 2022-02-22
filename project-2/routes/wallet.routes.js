require('dotenv').config();
const axios = require('axios');
// const Coinlib = require ('coinlib-api') ; 
// const CoinlibClient = new Coinlib('a082867c6cfecc56') ;
const router = require("express").Router();
const Wallet = require("../models/Wallet.model");
const User = require("../models/User.model");
/* const  Binance  =require('node-binance-api') ; 
const  binance  = new Binance().options ({ 
  APIKEY:process.env.BINANCE_APIKEY,
  APISECRET:process.env.BINANCE_APISECRET
}) ; */


router.get("/coins", async (req, res, next) => {
    try {
        const response = await axios.get(`https://coinlib.io/api/v1/coinlist?key=bea89b3b21612ab2`);
        const coins = response.data.coins
        res.render("wallet/wallet", {coins});
    } catch (e) {
        console.log("error occurred", e);   
    }
  });


  router.get("/coins/:id", async (req, res, next) => {
    try {
        const {id} = req.params
        const response = await axios.get(`https://coinlib.io/api/v1/coin?key=bea89b3b21612ab2&symbol=${id}`);
        const coin = response.data
        console.log(coin)
        res.render("wallet/coin", {coin});
    } catch (e) {
        console.log("error occurred", e);
    }
  });

  router.post("/wallet/:symbol", async (req, res, next) => {
    try {
        const symbol = req.params.symbol
        console.log('symbol',symbol)
        const response = await axios.get(`https://coinlib.io/api/v1/coin?key=bea89b3b21612ab2&symbol=${symbol}`);
        const coin = response.data
        const user = req.session.user
 let userToChange = await User.findById(user._id);
userToChange.suggested.push(coin);
userToChange.save();

 res.redirect('/auth/favoritos')
    } catch (e) {
        console.log("error occurred", e);
    }
  });


module.exports = router;
