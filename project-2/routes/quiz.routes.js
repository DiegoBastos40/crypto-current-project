const router = require('express').Router();
const User = require('./../models/User.model');
const isLoggedIn = require('./../middleware/isLoggedIn');
require('dotenv').config();
const axios = require('axios');
const Coinlib = require ('coinlib-api') ; 
const CoinlibClient = new Coinlib('a082867c6cfecc56') ;

router.post('/profile', async (req, res) => {
    const { q_1, q_2, q_3 } = req.body;
    const combination = q_1 + q_2 + q_3;
    console.log(q_1, q_2, q_3 )
    console.log(combination);
    
    const dictionary = {
        aaa : ['https://www.coinbase.com/pt-PT/price/bitcoin', 'Binance', 'Terra', 'File Coin', 'solana', 'Pokadoti'],
        aab : ['crypto.com', 'binance', 'Theta Network', 'AXS', 'Pankake Swap', 'Uniswap'],
        aac : ['XRP', 'Bitcoin', 'Ethereum', 'Cardano', 'USD coin', 'Terra'],
        aba : ['crypto.com', 'Binance', 'Terra', 'File Coin', 'solana', 'Pokadoti'],
        abb : ['crypto.com', 'binance', 'Theta Network', 'AXS', 'Pankake Swap', 'Uniswap'],
        abc : ['XRP', 'Bitcoin', 'Ethereum', 'Cardano', 'USD coin', 'Terra'],
        aca : ['crypto.com', 'Binance', 'Terra', 'File Coin', 'solana', 'Pokadoti'],
        acb : ['crypto.com', 'binance', 'Theta Network', 'AXS', 'Pankake Swap', 'Uniswap'],
        acc:  ['XRP', 'Bitcoin', 'Ethereum', 'Cardano', 'USD coin', 'Terra'],
        baa : ['crypto.com', 'Binance', 'Terra', 'File Coin', 'solana', 'Pokadoti'],
        bab : ['crypto.com', 'binance', 'Theta Network', 'AXS', 'Pankake Swap', 'Uniswap'],
        bac : ['XRP', 'Bitcoin', 'Ethereum', 'Cardano', 'USD coin', 'Terra'],
        bba : ['crypto.com', 'Binance', 'Terra', 'File Coin', 'solana', 'Pokadoti'],
        bbb : ['crypto.com', 'binance', 'Theta Network', 'AXS', 'Pankake Swap', 'Uniswap'],
        bbc : ['XRP', 'Bitcoin', 'Ethereum', 'Cardano', 'USD coin', 'Terra'],
        bca : ['crypto.com', 'Binance', 'Terra', 'File Coin', 'solana', 'Pokadoti'],
        bcb : ['crypto.com', 'binance', 'Theta Network', 'AXS', 'Pankake Swap', 'Uniswap'],
        bcc: ['XRP', 'Bitcoin', 'Ethereum', 'Cardano', 'USD coin', 'Terra'],
        caa : ['crypto.com', 'Binance', 'Terra', 'File Coin', 'solana', 'Pokadoti'],
        cab : ['crypto.com', 'binance', 'Theta Network', 'AXS', 'Pankake Swap', 'Uniswap'],
        cac : ['XRP', 'Bitcoin', 'Ethereum', 'Cardano', 'USD coin', 'Terra'],
        cba : ['crypto.com', 'Binance', 'Terra', 'File Coin', 'solana', 'Pokadoti'],
        cbb : ['crypto.com', 'binance', 'Theta Network', 'AXS', 'Pankake Swap', 'Uniswap'],
        cbc : ['XRP', 'Bitcoin', 'Ethereum', 'Cardano', 'USD coin', 'Terra'],
        cca : ['crypto.com', 'Binance', 'Terra', 'File Coin', 'solana', 'Pokadoti'],
        ccb : ['crypto.com', 'binance', 'Theta Network', 'AXS', 'Pankake Swap', 'Uniswap'],
        ccc: ['XRP', 'Bitcoin', 'Ethereum', 'Cardano', 'USD coin', 'Terra']
    }
    let user = req.session.user
    const userAnswer = dictionary[combination]
    
    await Promise.all(userAnswer.map(async (val) => {
        let userToChange = await User.findById(user._id);
        
        userToChange.suggested.push(val)
        userToChange.save()

    }));

   setTimeout(()=>{
    res.redirect('/auth/favoritos') 
   },50)
        
    
    
});


 
module.exports = router;