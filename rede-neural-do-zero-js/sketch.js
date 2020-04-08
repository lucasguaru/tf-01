nn = new RedeNeural(2, 3, 1);
redeNeuralTela = RedeNeuralTela(nn);

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
let train = true;

while (train) {
    for (var i = 0; i < 10000; i++) {
        var index = floor(random(4));
        nn.train(dataset.inputs[index], dataset.outputs[index]);
    }
    if (nn.predict([0, 0])[0] < 0.04 && nn.predict([1, 0])[0] > 0.98) {
        train = false;
        console.log("terminou");
    }
}