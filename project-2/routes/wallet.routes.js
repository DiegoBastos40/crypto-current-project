require("dotenv").config();
const axios = require("axios");
const router = require("express").Router();
const Wallet = require("../models/Wallet.model");
const User = require("../models/User.model");
const express = require('express');
const app = express();
const path = require('path');

router.get("/coins", async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://coinlib.io/api/v1/coinlist?key=d996a4fc60938e2e`
    );
    const coins = response.data.coins;
    res.render("wallet/wallet", { coins });
  } catch (e) {
    console.log("error occurred", e);
  }
});

router.get("/coins/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `https://coinlib.io/api/v1/coin?key=d996a4fc60938e2e&symbol=${id}`
    );
    const coin = response.data;
    console.log(coin);
    res.render("wallet/coin", { coin });
  } catch (e) {
    console.log("error occurred", e);
  }
});

router.get('/graficos',function(req,res){
  res.render('wallet/graficos');
});

router.post("/wallet/:theSymbol", async (req, res, next) => {
  try {
    const theSymbol = req.params.theSymbol;
    console.log("symbol", theSymbol);
    const response = await axios.get(
      `https://coinlib.io/api/v1/coin?key=bea89b3b21612ab2&symbol=${theSymbol}`
    );
    const coin = response.data;
    const user = req.session.user;

    let userToChange = await User.findById(user._id);
    let exist = false;

    userToChange.suggested.forEach(coin => {
      if(coin.symbol == theSymbol) {
        exist = true
      }
    })
        
    if (!exist) {
      userToChange.suggested.push(coin);
    }

    userToChange.save();

    res.redirect("/auth/favoritos");
  } catch (e) {
    console.log("error occurred", e);
  }
});

router.post("/wallet/:symbol/delete", async (req, res, next) => {
  try {
    const symbol = req.params.symbol;
    const user = req.session.user;

    let userToChange = await User.findById(user._id);
    for(let i = 0; i < userToChange.suggested.length; i++){
      if ( userToChange.suggested[i].symbol === symbol){
        userToChange.suggested.splice(i, 1);
      }
    }
    userToChange.save()


    res.redirect("/auth/favoritos");
  } catch (e) {
    console.log("error occurred", e);
  }
});

module.exports = router;
