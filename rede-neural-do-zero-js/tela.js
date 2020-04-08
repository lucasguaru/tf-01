var canvas, ctx, ALTURA, LARGURA, frames = 0;
ALTURA = window.innerHeight - 50;
LARGURA = window.innerWidth - 20;
if (LARGURA > 1500) {
    LARGURA = 1500;
    ALTURA = 800;
}

function main() {
    canvas = document.createElement("canvas");
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "1px solid #000";

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    roda();
}
function roda() {
    atualiza();
    desenha();
    window.requestAnimationFrame(roda);
}
function atualiza() {
    frames++;
    redeNeuralTela.atualizar();
    // personagem.atualiza();
    // obstaculos.atualiza();
}
function desenha() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, LARGURA, ALTURA);
    redeNeuralTela.desenhar();
    // chao.desenha();
    // obstaculos.desenha();
    // personagem.desenha();
    // desafio.desenha();
}

// main();