const tabela = document.getElementById("coin-2");
const input = document.getElementById("search-1");
const botao = document.getElementById("btn-2");
const erro = document.getElementById("erroBusc");

let todasMoedas = [];

// BUSCAR API
fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl")
.then(res => res.json())
.then(data => {

    todasMoedas = data;

    renderTabela(data.slice(0,10));

});


function renderTabela(moedas){

    tabela.innerHTML = "";

    moedas.forEach(coin => {

        const tr = document.createElement("tr");


        tr.innerHTML = `
        <td>
            <img src="${coin.image}" width="20">
            ${coin.symbol.toUpperCase()}
        </td>

        <td>${coin.name}</td>

        <td>$ BRL ${coin.current_price}</td>

        <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
            ${coin.price_change_percentage_24h.toFixed(2)}%
        </td>

        <td>$ ${coin.market_cap.toLocaleString()}</td>
        `;

        tabela.appendChild(tr);

    });

}


function buscarMoeda(){

    const valor = input.value.toLowerCase().trim();


    if(valor === ""){
        erro.style.display = "none";
        renderTabela(todasMoedas.slice(0,10));
        return;
    }

    const resultado = todasMoedas.filter(coin =>
        coin.name.toLowerCase().includes(valor) ||
        coin.symbol.toLowerCase().includes(valor)
    );

    if(resultado.length === 0){

        tabela.innerHTML = "";
        erro.style.display = "block";

    }else{

        erro.style.display = "none";
        renderTabela(resultado);

    }

}


botao.addEventListener("click", buscarMoeda);


input.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        buscarMoeda();
    }

});

const btn2 = document.getElementById('btn-3')

btn2.addEventListener('click', function(){
  menorValor(todasMoedas);
});

function menorValor(moedas){
  let menor = moedas[0];

  moedas.forEach(coin =>{
    if(coin.current_price < menor.current_price){
      menor = coin;
    }
  });
  
  console.log('Menor valor:' , menor.name, menor.current_price);
}