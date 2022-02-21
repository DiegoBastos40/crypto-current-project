require('dotenv').config();
const router = require("express").Router();
const Wallet = require("../models/Wallet.model");
const  Binance  =require('node-binance-api') ; 
const  binance  = new Binance().options ({ 
  APIKEY:process.env.BINANCE_APIKEY,
  APISECRET:process.env.BINANCE_APISECRET
}) ;

router.get("/wallet", (req, res, next) =>{

    
    binance.prevDay(false, (error, prevDay) => {
        //console.log(prevDay); // view all data
        res.render('wallet/wallet', {coin:prevDay})

      })

     
})



router.get("/wallet/create", (req, res) => {
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


module.exports = router;