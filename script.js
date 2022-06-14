let numCartas;
const listaCartas = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif', 'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif' ]
let listaCombinacao;
function verificarNum(numero){
  if(numero >= 4 && numero <= 14 && (numero%2 === 0)){
    return true;
  }
  return false;
}

function pegarElemento(classe){
  const elemento = document.querySelector(classe);
  return elemento;
}

function adicionarCartas(qntde){
  const areaCartas = pegarElemento('.area-cartas .cartas');
  for(let i=0; i<qntde; i++){
    areaCartas.innerHTML += `<div class="carta" onclick="revelarCarta(this)"><img class="" src="/assets/front.png" alt="piriquito"><img class="esconder" src="/assets/unicornparrot.gif" alt="piriquito"></div>`;
  }
}

function revelarCarta(carta){
  carta.querySelector('img:first-child').classList.add('esconder');
  carta.querySelector('img:last-child').classList.remove('esconder');
}

do{
  numCartas = prompt("Com quantas cartas você deseja jogar?");
}while(verificarNum(numCartas) == false);

switch (numCartas) {
  case 4:
    
    break;
  case 6:
  
    break;
  case 8:

    break;
  case 10:

    break;
  case 12:

    break;
  case 14:

    break;
                                            
  default:
    break;
}
adicionarCartas(numCartas);