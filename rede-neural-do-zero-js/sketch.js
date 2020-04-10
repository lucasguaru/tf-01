redeNeural = new RedeNeural(2, 3, 1);
redeNeuralTela = new RedeNeuralTela(redeNeural);
setTimeout(main, 0);
// main();//tela

// XOR Problem
dataset = {
    inputs:
        [[1, 1],
        [1, 0],
        [0, 1],
        [0, 0]],
    outputs:
        [[0],
        [1],
        [1],
        [0]]
}


document.body.addEventListener("mousedown", clicou);
document.body.addEventListener("keypress", function(event) {
    if (event.keyCode == 32 || event.keyCode == 38) {
        clicou(true);
    }
});

var clickConst = 0;
var CLICK_PESOS = clickConst++;
var CLICK_HIDDEN = clickConst++;
var CLICK_HIDDEN_SIG = clickConst++;
var CLICK_OUTPUT = clickConst++;
var CLICK_OUTPUT_SIG = clickConst++;
var CLICK_ERRO = clickConst++;


var clicks = 0;
function clicou() {
    switch (clicks++) {
        case CLICK_PESOS:
            mostrarPesos();
            break;
        case CLICK_HIDDEN:
            mostrarHidden();
            break;
        case CLICK_HIDDEN_SIG:
            mostrarHiddenSig();
            break;
        case CLICK_OUTPUT:
            mostrarOutput();
            break;
        case CLICK_OUTPUT_SIG:
            mostrarOutputSig();
            break;
        case CLICK_ERRO:
            treinar(true);
            mostrarErro();
            break;
        default:
            treinar(true);
            break;
    }
}

function mostrarPesos() {
    treinar();
    redeNeuralTela.mostrarPesos = true;
    redeNeuralTela.matrix[0] = redeNeural.input;
}
function mostrarHidden() {
    redeNeuralTela.matrix[1] = Matrix.transpose(redeNeural.hidden).data[0];
    redeNeuralTela.hiddenConta = redeNeural.hiddenConta;
    redeNeuralTela.mostrarHidden = true;
}
function mostrarHiddenSig() {
    redeNeuralTela.mostrarHiddenSig = true;
}
function mostrarOutput() {
    redeNeuralTela.matrix[2] = Matrix.transpose(redeNeural.output).data[0];
    redeNeuralTela.outputConta = redeNeural.outputConta;
    redeNeuralTela.mostrarOutput = true;
}
function mostrarOutputSig() {
    redeNeuralTela.mostrarOutputSig = true;
}
function mostrarErro() {
    redeNeuralTela.mostrarHidden = false;
    redeNeuralTela.mostrarHiddenSig = false;
    redeNeuralTela.mostrarOutput = false;
    redeNeuralTela.mostrarOutputSig = false;
    redeNeuralTela.mostrarErro = true;
}

// setTimeout(treinar, 1000);
// let i = 0;
let treinosCount = 0;
function treinar(backprop) {

    for (let i = 0; i < 100; i++) {
        treinosCount++;
        var index = Math.floor(Math.random() * 4);
        redeNeural.train(dataset.inputs[index], dataset.outputs[index], backprop);        
    }
    redeNeuralTela.matrix[0] = redeNeural.input;
    redeNeuralTela.matrix[1] = Matrix.transpose(redeNeural.hidden).data[0];
    redeNeuralTela.matrix[2] = Matrix.transpose(redeNeural.output).data[0];
    console.log('Treinos: ', treinosCount);
    
    // let train = false;
    // while (train) {
        // if (i++ < 100) {
            

            // setTimeout(treinar, 1000);
        // } else {
            // redeNeural.predict([0, 0])[0] < 0.04 && redeNeural.predict([1, 0])[0] > 0.98
        // }
        // if (redeNeural.predict([0, 0])[0] < 0.04 && redeNeural.predict([1, 0])[0] > 0.98) {
        //     train = false;
        //     console.log("terminou");
        // }
    // }
}