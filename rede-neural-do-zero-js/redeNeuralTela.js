class RedeNeuralTela {
    NEURON_RAIO = 20;
    NEURON_DIST = 50;
    NEURON_DIST_LAT = 240;
    NEURON_COLORS = ["green", "blue", "red"];
    CONNECTIONS_COLORS = ["green", "blue", "red", "brown", "blueviolet", "chartreuse", "coral"];

    constructor(redeNeural) {
        this.redeNeural = redeNeural;
    }

    desenhar() {
        let matrix = [[], [], []];
        // let matrix = [[8, 5, 2], [9, 7, 6, 6], [2]];

        let maxLenght = 0;
        matrix.forEach(el => {
            if (el.length > maxLenght) { 
                maxLenght = el.length;
            }
        });

        matrix.forEach((ar, layerIndex) => {
            ar.forEach((valor, elemIndex) => {
                drawNeuron(elemIndex, layerIndex, ar.length, maxLenght, valor);
            });
        });

        drawConnections(matrix, maxLenght);
    }
    
    /**
     * 
     * @param {*} item item index (0 = first, 1 = second)
     * @param {*} layer  neuron layer (0 = first, 1 = second)
     * @param {*} totalNeuronsOnLayer max neuron qty for this column
     * @param {*} maxNeurons max neuron qty for the biggest column
     * 
     * E.g.: Three layers of neurons. 1st layer with 3 elements, 2nd layer with 7 elements, 3rd layer with 4 elements
     *      item = 0 -> index
     *      layer = 0 -> if it is the first layer (input layer)
     *      totalNeuronsOnLayer = 3 -> 3 elements on the first layer
     *      maxNeurons = 7 -> from the biggest that is the 2nd layer with 7 elements
     */
    drawNeuron(item, layer, totalNeuronsOnLayer, maxNeurons, value) {
        const {x, y} = calcNeuronPosition(item, layer, totalNeuronsOnLayer, maxNeurons);
        ctx.beginPath();
        ctx.arc(x, y, NEURON_RAIO, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = NEURON_COLORS[layer];
        ctx.fill();

        ctx.font = '12pt Verdana';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(value, x, y + 6);
    }

    drawConnections(matrix, maxLenght) {
        let matrixPos = [];
        for (let layerIndex = 0; layerIndex < matrix.length; layerIndex++) {
            let arPos = [];
            const ar = matrix[layerIndex];
            for (let elemIndex = 0; elemIndex < ar.length; elemIndex++) {
                const valor = ar[elemIndex];
                arPos.push(calcNeuronPosition(elemIndex, layerIndex, ar.length, maxLenght));
            }
            matrixPos.push(arPos);
        }

        for (let layerIndex = 0; layerIndex < matrixPos.length - 1; layerIndex++) {
            const ar = matrixPos[layerIndex];
            for (let elemIndex = 0; elemIndex < ar.length; elemIndex++) {
                const elemPos = ar[elemIndex];
                const proxArray = matrixPos[layerIndex + 1];
                proxArray.forEach((elemProxPos, proxIndex) => {
                    drawLine(elemPos.x + NEURON_RAIO, elemPos.y, elemProxPos.x - NEURON_RAIO, elemProxPos.y, CONNECTIONS_COLORS[proxIndex]);
                });
            }
        }

        function drawLine(x, y, xTo, yTo, color) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(xTo, yTo);
            ctx.strokeStyle = color;
            ctx.stroke();
        }

    }

    calcNeuronPosition(item, layer, totalNeuronsOnLayer, maxNeurons) {
        let result = {x: 0, y: 0};

        result.x = NEURON_DIST + (NEURON_RAIO * 2) + (NEURON_DIST_LAT * layer);
        let colTotal = NEURON_DIST + (NEURON_RAIO * 2) + ((NEURON_RAIO * 2) * maxNeurons) + (NEURON_DIST * maxNeurons);
        let colTotalLayer = NEURON_DIST + (NEURON_RAIO * 2) + ((NEURON_RAIO * 2) * totalNeuronsOnLayer) + (NEURON_DIST * totalNeuronsOnLayer);
        result.y = ((colTotal - colTotalLayer) / 2) + NEURON_DIST + (NEURON_RAIO * 2) + ((NEURON_RAIO * 2) * item) + (NEURON_DIST * item);

        return result;
    }
    
};

