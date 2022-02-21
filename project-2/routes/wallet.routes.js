require('dotenv').config();
const axios = require('axios');
const Coinlib = require ('coinlib-api') ; 
const CoinlibClient = new Coinlib('a082867c6cfecc56') ;
const router = require("express").Router();
const Wallet = require("../models/Wallet.model");
/* const  Binance  =require('node-binance-api') ; 
const  binance  = new Binance().options ({ 
  APIKEY:process.env.BINANCE_APIKEY,
  APISECRET:process.env.BINANCE_APISECRET
}) ; */

/* CoinlibClient.setKey('a082867c6cfecc56'); */

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

  /* router.get("/coins", (req, res, next) => {
        axios.get(`https://data.messari.io/api/v2/assets`)
        .then((response) => {
            const coins = response.data.data
            console.log(coins)
            res.render("wallet/wallet", {coins});
        })
        .catch(error => {
            console.error('Error: ', error);
          });      
  }); */


  /* router.get("/profile", requireLogin, async (req, res) => {
    const user = await User.findById(req.session.currentUser._id);
    const plans = await Plan.find({ user });
    res.render("plan/profile-plan-list", { plans, user });
  }); */


/* const api = axios.get({
    baseURL: 'https://coinlib.io/api/v1/coinlist?key=a082867c6cfecc56&pref=BTC&page=1&order=volume_desc'
  });

  api
  .get('/wallet')
  .then(response => console.log(`All characters are: `, response.coins))
  .catch(error => console.log(error));  */


  /* router.get("/wallet", (req, res, next) =>{

    
    Coinlib.coins.list((order) => {
        //console.log(prevDay); // view all data
        res.render('wallet/wallet',{coin:order})

      })

     
})
  
/*   router.get("/wallet", (req, res, next) =>{

    
    binance.prevDay(false, (error, prevDay) => {
        //console.log(prevDay); // view all data
        res.render('wallet/wallet', {coin:prevDay})

      })

     
}) */

 


/* router.get("/wallet", (req, res, next) =>{

    let data = await Coinlib.coins.list();
     Coinlib.coins.list(false, (error, prevDay) => {
        //console.log(prevDay); // view all data
        res.render('wallet/wallet', {coin:prevDay})

      }) 

      res.render('wallet/wallet', {coin:data})
})
 */


/* router.get("/wallet/create", (req, res) => {
    res.render("wallet/new-coin")
});

router.post("/wallet/create", (req, res) => {
    const {priceChange,symbol,price} = req.body;

    Wallet.create({priceChange,symbol,price})
    .then((createdCoin) => {
       
        res.redirect('/wallet')
    })
    .catch((err) => {
        res.render("/wallet/new-coin")
    })
});
router.post('/wallet/:id/delete', (req, res, next) => {
    const {id} = req.params;
  
      Wallet.findByIdAndRemove(id)
      .then(() => {
          res.redirect("/wallet");
      })
      .catch((err) => {
          next(err)
      })
  });
  router.get('/wallet/:id/edit',  (req, res, next) =>{
    Wallet.findById(req.params.id)
    .then((coinFound) =>{
        res.render("wallet/edit-wallet", {coinFound: coinFound})
    })
    
})
router.post('/wallet/:id/edit',  (req, res, next) =>{
  const {id} = req.params;
  const {priceChange,symbol,price} = req.body;
Celebrity.findByIdAndUpdate(id, {priceChange,symbol,price})
.then(() => {
  res.redirect("/wallet");
})
.catch((err) => next(err))

})

 */
module.exports = router;