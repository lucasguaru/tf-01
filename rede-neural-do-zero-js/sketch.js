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

var clickConst = 0;
var CLICK_PESOS = clickConst++;
var CLICK_HIDDEN = clickConst++;
var CLICK_HIDDEN_SIG = clickConst++;
var CLICK_OUTPUT = clickConst++;
var CLICK_OUTPUT_SIG = clickConst++;


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
        default:
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

// setTimeout(treinar, 1000);
// let i = 0;
function treinar() {
    let train = false;
    
    // while (train) {
        // if (i++ < 100) {
            var index = Math.floor(Math.random() * 4);
            redeNeural.train(dataset.inputs[index], dataset.outputs[index], false);
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