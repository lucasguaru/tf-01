var canvas, ctx, ALTURA, LARGURA, frames = 0;
ALTURA = window.innerHeight;
LARGURA = window.innerWidth;
if (LARGURA > 1000) {
    LARGURA = 1000;
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
    ctx.fillStyle = "#50beff";
    ctx.fillRect(0, 0, LARGURA, ALTURA);
    redeNeuralTela.desenhar();
    // chao.desenha();
    // obstaculos.desenha();
    // personagem.desenha();
    // desafio.desenha();
}

// main();