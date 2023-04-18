//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro= 13;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Variáveis da minha raquete
let xRaquete = 5;
let yRaquete = 175;
let larguraRaquete = 8;
let alturaRaquete= 60;

//variáveis da raquete do oponente
let xRaqueteop = 585;
let yRaqueteop = 175;
let velocidadeYop;

//Variáveis pontos
let meusPontos = 0;
let pontosOp = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

let colidiu = false

//Movimento da raquete


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0); //1- desenha a cor do fundo.
  
  //BOLINHA
  mostraBolinha ();//2- Ponto inicial onde a bolinha aparece inicialmente.
  movimentaBolinha();//3- Comportamento de movimentação após aparecimento.
  colisaoBorda();//4- Define o comportamento em colisão com as bordas.
  colisaoRaquete();//5- Define o comprotamento da bolinha quando: tocar em raquete, tocar na borda abaixo da raquete e na borda acima da raquete.
  
  //RAQUETE
  mostrarRaquete(xRaquete, yRaquete);
  movimentoRaquete();
  colisaoraquetes(xRaquete, yRaquete);
  
  //Raquete oponente
  mostrarRaquete(xRaqueteop, yRaqueteop);
  movimentoRaqueteop();
  colisaoraquetes(xRaqueteop, yRaqueteop);
  
  //Placar
  incluiPlacar();
  marcaPonto();
  
  //a "function draw" repete-se em loop(sempre) linha por linha, dentro deste contexto temos alguns comandos dentro da função:
  
  //1-noLop: interrompe a execução do código.
  //2-redraw: executa o código apenas uma vez.
  //3-loop: retoma a execução continuamente.
  
  
  
}
//FUNÇÕES BOLINHA:

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
    
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function colisaoRaquete(){
  if (xBolinha - raio < xRaquete + larguraRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *=-1;
    raquetada.play();
  }
}

//FUNÇÕES RAQUETE:

function mostrarRaquete(x,y){
  rect(x,y, larguraRaquete, alturaRaquete)
}

function movimentoRaquete(){
  if (keyIsDown(87)){
    yRaquete -= 10;
  }
  if (keyIsDown(83)){
    yRaquete += 10;
  }
}

//Raquete oponente
function colisaoraquetes(x,y){
  colidiu=
collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentoRaqueteop(){
    if (keyIsDown(UP_ARROW)){
    yRaqueteop -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaqueteop += 10;
  }
}
  
// Placar
function incluiPlacar(){
  stroke(255);
  textAlign(CENTER)
  textSize(20);
  fill(color(255, 140, 0));
  rect(150,10,40,20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450,10,40,20);
  fill(255);
  text(pontosOp, 470, 26 );
}
function marcaPonto(){
  if (xBolinha > 590){
    meusPontos +=1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOp +=1;
    ponto.play();
  }
}