require('dotenv').config();
const axios = require('axios');
const Coinlib = require ('coinlib-api') ; 
const CoinlibClient = new Coinlib('a082867c6cfecc56') ;
const router = require("express").Router();
const Wallet = require("../models/Wallet.model");


router.get("/coins", async (req, res, next) => {
    try {
        const response = await axios.get(`https://coinlib.io/api/v1/coinlist?key=a082867c6cfecc56`);
        const coins = response.data.coins
        res.render("wallet/wallet", {coins});
    } catch (e) {
        console.log("error occurred", e);   
    }
  });


  router.get("/coins/:id", async (req, res, next) => {
    try {
        const {id} = req.params
        const response = await axios.get(`https://coinlib.io/api/v1/coin?key=a082867c6cfecc56&symbol=${id}`);
        const coin = response.data
        console.log(coin)
        res.render("wallet/coin", {coin});
    } catch (e) {
        console.log("error occurred", e);
    }
  });

module.exports = router;
