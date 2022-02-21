const  Binance  =require('node-binance-api') ; 
const  binance  = new Binance().options ({ 
  APIKEY : 'EPdiO4PKIjl8qyVjiAJeZq8zh83dPZAnU2iwsuSCoUCYOQN4k4lyquVPP6ysWN18' , 
  APISECRET :'1Yajx1j9Lf75ZWbUlLgIBiMjgR50y41hcWwA3jNNpC0Eh5zSzJsEqQYJZfSOkOLh'
}) ;



//Get 24hr ticker price change statistics for all symbols

binance.prevDay(false, (error, prevDay) => {
    // console.info(prevDay); // view all data
    for ( let obj of prevDay ) {
      let symbol = obj.symbol;
      console.info(symbol+" volume:"+obj.volume+" change: "+obj.priceChangePercent+"%");
    }
  });

  //Get 24hr Price Change Statistics via WebSocket

  binance.websockets.prevDay(false, (error, response) => {
    console.info(response);
  });