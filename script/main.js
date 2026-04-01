
const options = {method: 'GET', headers: {'x-cg-demo-api-key': 'CG-F5ByHq8gvxTwafLCb1DoxPGo'}};

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h', options)
  .then(res => res.json())
  .then(data => { 
    const limite = Math.min(data.length,10);
   for (let i = 0; i < limite; i++){
      criaP(data, i)
    }
    
    return data;
  })
  .catch(err => console.log(err));
    

    function criaP (valor,index){
    const tittle = document.createElement('td');
    const price = document.createElement('td');
    const coinHour = document.createElement('td');
    const marketcap = document.createElement('td');
    
    coinHour.id = "PriceCheck"
    price.id = 'PriceNow'
    marketcap.id = 'MarketConvert'

    const coin_desc = valor[index]
      let coin_value = coin_desc.current_price;
      coin_value = coin_value * 5;

      let coin_marketCap = coin_desc.market_cap;

      let coin24h = coin_desc.price_change_percentage_24h;
      

      console.log(coin24h)
      console.log(coin_marketCap)
      console.log(coin_value)
      tittle.textContent = coin_desc.id;
      price.textContent = coin_value;
      coinHour.textContent = coin24h;
      marketcap.textContent = convertMarket(coin_marketCap);

      sectionCoin.appendChild(tittle)
      sectionCoin.appendChild(price)
      sectionCoin.appendChild(coinHour)
      sectionCoin.appendChild(marketcap)

      
      PriceNow.innerHTML = coin_value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
  });

      
      tendenciaVerificada(coin24h);
      
    }

    function convertMarket (valor){
      if(valor >= 1_000_000_000_000){
        return 'R$' + (valor / 1_000_000_000_000).toFixed(2) + "T";
      } else if (valor >= 1_000_000_000){
        return 'R$' + (valor / 1_000_000_000).toFixed(2) + "B";
      }
    }

    function tendenciaVerificada(porcentagem){
      if(porcentagem >0){
        PriceCheck.style.color = 'Green'
        PriceCheck.innerHTML = `▲ ${porcentagem.toFixed(2)}%`;
        return console.log('o preço subiu !');
      } else if (porcentagem <0 ){
        PriceCheck.style.color = 'Red'
        PriceCheck.innerHTML = `▼ ${porcentagem.toFixed(2)}%`;
        return console.log('O preço caiu...');
      } else {
        return console.log('O preço está estavel')
      }
    }
    const sectionCoin = document.querySelector('#coin-2')