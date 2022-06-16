let numCartas;
let cartaSelecionada = '';
const listaCartas = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif', 'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif' ]
let listaCombinacao;

function verificarNum(numero){
  if(numero >= 4 && numero <= 14 && (numero%2 === 0)){
    return true;
  }
  return false;
}

function comparador() { 
	return Math.random() - 0.5; 
}

function embaralharDeck(listCartas){
  const novaLista = listCartas.sort(comparador);
  return novaLista;
}


function pegarElemento(classe){
  const elemento = document.querySelector(classe);
  return elemento;
}

function adicionarCartas(qntde){
  const areaCartas = pegarElemento('.area-cartas .cartas');

  let deckFinal = [];
  let deckEmbaralhado = embaralharDeck(listaCartas).slice(0, (qntde/2));//pega a metade da qntde de carta no deck embaralhado 

  for(let i=0; i<deckEmbaralhado.length; i++){
    deckFinal.push(deckEmbaralhado[i]);
    deckFinal.push(deckEmbaralhado[i]);
  }

  embaralharDeck(deckFinal);

  console.log(deckFinal)

  for(let i=0; i<qntde; i++){
    areaCartas.innerHTML += `
      <div class="carta" onclick="verificarCartasIguais(this)">
        <img class="" src="/assets/front.png">
        <img class="esconder }" src="/assets/${deckFinal[i]}">
      </div>
    `;
  }

}

function revelarCarta(carta){
  carta.classList.add('virar');
  carta.querySelector('img:first-child').classList.add('esconder');
  carta.querySelector('img:last-child').classList.remove('esconder');
}

function esconderCarta(carta){
  carta.classList.remove('virar');
  carta.querySelector('img:first-child').classList.remove('esconder');
  carta.querySelector('img:last-child').classList.add('esconder');
}

function desativarCartas(){

  const cartas = document.querySelectorAll('.carta');

  for(let i=0; i<cartas.length; i++){
    cartas[i].setAttribute('onclick', '');
  }
}

function ativarCartas(){

  const cartas = document.querySelectorAll('.carta');

  for(let i=0; i<cartas.length; i++){
    cartas[i].setAttribute('onclick', 'verificarCartasIguais(this)');
  }
}

function verificarCartasIguais(carta){
  revelarCarta(carta);

  if(cartaSelecionada === ''){
    cartaSelecionada = carta;
  } else {

    let itemCarta = carta.querySelector('img:last-child').getAttribute('src'); 
    let itemCartaSelecionada = cartaSelecionada.querySelector('img:last-child').getAttribute('src'); 

    if(itemCarta === itemCartaSelecionada){
      console.log('iguais');
      cartaSelecionada = '';
    }else{
      console.log('diferente');
      desativarCartas();
      setTimeout(() => {
        esconderCarta(cartaSelecionada);
        esconderCarta(carta);
        cartaSelecionada = '';
        ativarCartas();
      },"1000");
    }
  }
}

do{
  numCartas = prompt("Com quantas cartas você deseja jogar?");
}while(verificarNum(numCartas) == false);

adicionarCartas(numCartas);