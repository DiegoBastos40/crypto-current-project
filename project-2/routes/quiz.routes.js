const router = require("express").Router();
const User = require("./../models/User.model");
const isLoggedIn = require("./../middleware/isLoggedIn");
//novo:
const axios = require("axios");
// 

router.post("/profile", async (req, res) => {
  const { q_1, q_2, q_3 } = req.body;
  const combination = q_1 + q_2 + q_3;
  console.log(q_1, q_2, q_3);
  console.log(combination);

  const dictionary = {
    aaa: [
      "BTC",
      "BNB",
      "LUNA",
      "FIL",
      "SOL",
      "DOT",
    ],
    aab: [
      "CRO",
      "BNB",
      "THETA",
      "AXS",
      "CAKE",
      "UNI",
    ],
    aac: [
      "XRP",
      "BTC",
      "ADA",
      "USDC",
      "LUNA",
      "BTC",
    ],
    aba: [
      ,
      "CRO",
      "BNB",
      "LUNA",
      "FIL",
      "SOL",
      "DOT",
    ],
    abb: [
      ,
      "CRO",
      "BNB",
      "THETA",
      "AXS",
      "CAKE",
      "UNI",
    ],
    abc: [
      ,
      "XRP",
      "BTC",
      "ETH",
      "ADA",
      "USDC",
      "LUNA",
    ],
    aca: [
      ,
      "CRO",
      "BNB",
      "LUNA",
      "FIL",
      "SOL",
      "DOT",
    ],
    acb: [
      ,
      "CRO",
      "BNB",
      "THETA",
      "AXS",
      "CAKE",
      "UNI",
    ],
    acc: [
      ,
      "XRP",
      "BTC",
      "ETH",
      "ADA",
      "USDC",
      "LUNA",
    ],
    baa: [
      ,
      "CRO",
      "BNB",
      "LUNA",
      "FIL",
      "SOL",
      "DOT",
    ],
    bab: [
      ,
      "CRO",
      "BNB",
      "THETA",
      "AXS",
      "CAKE",
      "UNI",
    ],
    bac: [
      ,
      "XRP",
      "BTC",
      "ETH",
      "ADA",
      "USDC",
      "LUNA",
    ],
    bba: [
      ,
      "CRO",
      "BNB",
      "LUNA",
      "FIL",
      "SOL",
      "DOT",
    ],
    bbb: [
      ,
      "CRO",
      "BNB",
      "THETA",
      "AXS",
      "CAKE",
      "UNI",
    ],
    bbc: [
      ,
      "XRP",
      "BTC",
      "ETH",
      "ADA",
      "USDC",
      "LUNA",
    ],
    bca: [
      ,
      "CRO",
      "BNB",
      "LUNA",
      "FIL",
      "SOL",
      "DOT",
    ],
    bcb: [
      ,
      "CRO",
      "BNB",
      "THETA",
      "AXS",
      "CAKE",
      "UNI",
    ],
    bcc: [
      ,
      "XRP",
      "BTC",
      "ETH",
      "ADA",
      "USDC",
      "LUNA",
    ],
    caa: [
      ,
      "CRO",
      "BNB",
      "LUNA",
      "FIL",
      "SOL",
      "DOT",
    ],
    cab: [
      ,
      "CRO",
      "BNB",
      "THETA",
      "AXS",
      "CAKE",
      "UNI",
    ],
    cac: [
      ,
      "XRP",
      "BTC",
      "ETH",
      "ADA",
      "USDC",
      "LUNA",
    ],
    cba: [
      ,
      "CRO",
      "BNB",
      "LUNA",
      "FIL",
      "SOL",
      "DOT",
    ],
    cbb: [
      ,
      "CRO",
      "BNB",
      "THETA",
      "AXS",
      "CAKE",
      "UNI",
    ],
    cbc: [
      ,
      "XRP",
      "BTC",
      "ETH",
      "ADA",
      "USDC",
      "LUNA",
    ],
    cca: [
      ,
      "CRO",
      "BNB",
      "LUNA",
      "FIL",
      "SOL",
      "DOT",
    ],
    ccb: [
      ,
      "CRO",
      "BNB",
      "THETA",
      "AXS",
      "CAKE",
      "UNI",
    ],
    ccc: [
      ,
      "XRP",
      "BTC",
      "ETH",
      "ADA",
      "USDC",
      "LUNA",
    ],
  };
  let user = req.session.user;
  const userAnswer = dictionary[combination];

  //   novo:

  const response = await axios.get(
    `https://coinlib.io/api/v1/coinlist?key=d996a4fc60938e2e`
  );
  const coins = response.data.coins;

   function apiCoinsValue(coinSymbolArr) {
    let sugestionArray = [];
    for (let i = 0; i < coinSymbolArr.length; i++) {
        for (let y = 0; y < coins.length; y++){
            if (coinSymbolArr[i] == coins[y].symbol) {
                sugestionArray.push(coins[y]);
              }
        }
    }
    return sugestionArray
  }

  let coinsArr = apiCoinsValue(userAnswer)
  console.log('toSave', coinsArr)

  await Promise.all(
    coinsArr.map(async (val) => {
      let userToChange = await User.findById(user._id);
      userToChange.suggested.push(val);
      userToChange.save();
    })
  );
  setTimeout(() => {
    res.redirect("/auth/favoritos");
  }, 50);
});

module.exports = router;
