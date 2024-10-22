let peixesCriados = []; 
let pedrasCriadas = []; 
let larguraCanvas, alturaCanvas; 

//canvas eh metade da tela
function setup() {
    larguraCanvas = windowWidth / 2; 
    alturaCanvas = windowHeight / 2; 
    createCanvas(larguraCanvas, alturaCanvas); 
    criarPedras(); 
}

//todos os desenhos
function draw() {
    background(22, 112, 247); 
    retanguloInferior();
   
    desenharPedras();
    desenharPeixes();

    animaPeixes();
}

//background das pedras
function retanguloInferior() {
    fill(130, 130, 130);
    rect(0, alturaCanvas - 100, larguraCanvas, 100); 
}

//array de pedra
function criarPedras() {
    for (let i = 0; i < 600; i++) {
        //monocromatico eh criado com todos os num rgb iguais, reduzi as cores pra nao ter preto nem branco
        let corPedra = random(50, 220);
        let pedraItem = {
            x: random(0, larguraCanvas),
            y: random(alturaCanvas - 100, alturaCanvas),
            largura: random(17, 32),
            altura: random(6, 17),
            cor: corPedra
        };
        pedrasCriadas.push(pedraItem);
    }
}
//desenhar pedras
function desenharPedras() {
    for (let i = 0; i < pedrasCriadas.length; i++) {
        const pedraItem = pedrasCriadas[i]; 
        fill(pedraItem.cor);         
        stroke(1);             
        ellipse(pedraItem.x, pedraItem.y, pedraItem.largura, pedraItem.altura);
    }
}
//array de peixe
function mouseClicked() {
    let corPeixe = color(random(0, 255), random(0, 255), random(0, 255));
    let peixeItem = {
        posicaoX: mouseX,
        posicaoY: mouseY,
        larguraCorpo: random(50, 80),
        alturaCorpo: random(30, 70),
        cor: corPeixe,
        tempo: 0 
    };
    peixesCriados.push(peixeItem);
}
//desenho de um peixe
function criarPeixe(posicaoX, posicaoY, larguraCorpo, alturaCorpo, cor) {
    noStroke();
    fill(cor);
    //corpo
    ellipse(posicaoX, posicaoY, larguraCorpo, alturaCorpo);

    const larguraCauda = larguraCorpo / 4;
    const alturaCauda = alturaCorpo / 2;
    //cauda
    triangle(
        posicaoX - larguraCorpo / 2,
        posicaoY,
        posicaoX - larguraCorpo / 2 - larguraCauda,
        posicaoY - alturaCauda,
        posicaoX - larguraCorpo / 2 - larguraCauda,
        posicaoY + alturaCauda
    );
    //olho
    fill(33, 33, 33);
    ellipse(
        posicaoX + larguraCorpo / 4,
        posicaoY,
        alturaCorpo / 5,
        alturaCorpo / 5
    );
}
//desenha peixe
function desenharPeixes() {
    for (let i = 0; i < peixesCriados.length; i++) {
        const peixeItem = peixesCriados[i]; 
        criarPeixe(peixeItem.posicaoX, peixeItem.posicaoY, peixeItem.larguraCorpo, peixeItem.alturaCorpo, peixeItem.cor); 
    }
}
//animacao do peixe saindo da tela
function animaPeixes() {
    for (let i = peixesCriados.length - 1; i >= 0; i--) {
        let peixeItem = peixesCriados[i];
        if (peixeItem.tempo >= 2) {
            peixeItem.posicaoX += 2; 
            if (peixeItem.posicaoX > larguraCanvas) {
                peixesCriados.splice(i, 1); // remove o peixe
            }
        } else {
            peixeItem.tempo += deltaTime / 500; //2 segundos
        }
    }
}

