let numCartas, acertos=0, jogadas=0, minutos=0, segundos=0;
let cartaSelecionada = '';

const listaCartas = [
  'bobrossparrot.gif', 
  'explodyparrot.gif', 
  'fiestaparrot.gif', 
  'metalparrot.gif', 
  'revertitparrot.gif', 
  'tripletsparrot.gif', 
  'unicornparrot.gif' 
];

let relogioIntervalo = setInterval(()=>{
  segundos ++;
  atualizarRelogio();
}, '1000');

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

function revelarCarta(carta){
  carta.classList.add('virar');
  carta.setAttribute('onclick', '');
  setTimeout(()=>{
    carta.querySelector('img:first-child').classList.add('esconder');
    carta.querySelector('img:last-child').classList.remove('esconder');
  }, 100)
}

function esconderCarta(carta){
  carta.classList.remove('virar');
  carta.setAttribute('onclick', 'verificarCartasIguais(this)');
  setTimeout(()=>{
    carta.querySelector('img:last-child').classList.add('esconder');
    carta.querySelector('img:first-child').classList.remove('esconder');
  }, 100)
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

function verificarFim(){
  if(acertos == (numCartas/2)){
    if(segundos < 10){
      segundos = '0'+segundos;
    }
    clearInterval(relogioIntervalo)
    setTimeout(() => {
      alert(`Você ganhou em ${jogadas} jogadas! com tempo de 0${minutos}:${segundos}`);
      fimDeJogo();
    }, 500)
  }
}

function verificarCartasIguais(carta){
  jogadas ++;
  revelarCarta(carta);

  if(cartaSelecionada === ''){
    cartaSelecionada = carta;
  } else {

    let itemCarta = carta.querySelector('img:last-child').getAttribute('src'); 
    let itemCartaSelecionada = cartaSelecionada.querySelector('img:last-child').getAttribute('src'); 

    if(itemCarta === itemCartaSelecionada){

      acertos ++;
      cartaSelecionada = '';

    }else{
      desativarCartas();
      setTimeout(() => {
        esconderCarta(cartaSelecionada);
        esconderCarta(carta);
        cartaSelecionada = '';
        ativarCartas();
      },"1000");

    }
  }
  verificarFim();
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

  for(let i=0; i<qntde; i++){
    areaCartas.innerHTML += `
      <div class="carta absolute" onclick="verificarCartasIguais(this)">
        <img class="" src="/assets/front.png">
        <img class="esconder }" src="/assets/${deckFinal[i]}">
      </div>
    `;
  }
}

function atualizarRelogio(){
  const minutosElemento = document.querySelector('.area-titulo .relogio span:first-child');
  const segundosElemento = document.querySelector('.area-titulo .relogio span:last-child');

  if(segundos >= 60){
    segundos = 0
    minutos ++;
    if(minutos < 60){
      segundosElemento.innerHTML = '0'+segundos;
      minutosElemento.innerHTML = '0'+minutos;
    }else{
      segundosElemento.innerHTML = '0'+segundos;
      minutosElemento.innerHTML = minutos;
    }
  }else{
    if(segundos < 10){
      segundosElemento.innerHTML = '0'+segundos;
      minutosElemento.innerHTML = '0'+minutos;
    }else{
      minutosElemento.innerHTML = '0'+minutos;
      segundosElemento.innerHTML = segundos;
    }
  }
}

function verifyReiniciar(resp){
  if(resp === 'sim' || resp === 'não'){
    return true;
  }else{
    return false;
  }
}

function fimDeJogo(){
  let reiniciar = ''

  do {
    reiniciar = prompt('Deseja reiniciar o jogo?');
    reiniciar = reiniciar.toLowerCase();
  }while(!verifyReiniciar(reiniciar));


  if(reiniciar == 'sim'){
    document.querySelector('.cartas').innerHTML = '';
    cartaSelecionada = '';
    acertos=0; 
    jogadas=0; 
    minutos=0; 
    segundos=0;
    inciarJogo();
  }
}

function animacaoInicio(){
  let cartas = document.querySelectorAll('.carta')

  for(let i=0; i<cartas.length; i++){
    cartas[i].classList.toggle('absolute');
  }
}

function inciarJogo(){
  do{
    numCartas = prompt("Com quantas cartas você deseja jogar?");
  }while(verificarNum(numCartas) == false);

  adicionarCartas(numCartas);
  relogioIntervalo = setInterval(()=>{});

  setTimeout(() => {
    animacaoInicio()
  }, '100')
}

inciarJogo();