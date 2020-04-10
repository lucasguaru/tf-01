class RedeNeuralTela {
    NEURON_RAIO = 20;
    NEURON_DIST = 50;
    NEURON_DIST_LAT = 400;
    NEURON_COLORS = ["green", "blue", "red"];
    CONNECTIONS_COLORS = ["green", "blue", "red", "brown", "blueviolet", "chartreuse", "coral"];
    NUMBERS_TOP = 400;
    NUMBERS_LEFT = 160;

    constructor(redeNeural) {
        this.redeNeural = redeNeural;        
        this.matrix = [[null, null], [null, null, null], [null]];
    }

    font(f, align) {
        ctx.font = f || '10pt Verdana';
        ctx.fillStyle = 'black';
        ctx.textAlign = align || 'center';
    }

    fontePequena(align) {
        this.font('8pt Verdana', align);
    }
    fonteGrande(align) {
        this.font('10pt Verdana', align);
    }
    fonteSuperGrande(align) {
        this.font('12pt Verdana', align);
    }

    atualizar() {
        //atualizar calculo
    }

    desenhar() {
        let matrix = this.matrix;        

        let maxLenght = 0;
        matrix.forEach(el => {
            if (el.length > maxLenght) { 
                maxLenght = el.length;
            }
        });

        this.drawConnections(matrix, maxLenght);

        matrix.forEach((ar, layerIndex) => {
            ar.forEach((valor, elemIndex) => {
                this.drawNeuron(elemIndex, layerIndex, ar.length, maxLenght, valor);
            });
        });


        if (this.mostrarPesos) {
            this.drawNumbers();
        }

    }

    drawNumbers() {
        this.fonteSuperGrande('left');
        ctx.fillText("VALORES RANDOMICOS DOS PESOS E BIAS:", this.NUMBERS_LEFT, this.NUMBERS_TOP - 50);

        this.fonteGrande();
        ctx.fillText("Peso Input -> Oculta", this.NUMBERS_LEFT, this.NUMBERS_TOP);
        ctx.fillText("Bias Oculta", this.NUMBERS_LEFT + 240, this.NUMBERS_TOP);
        ctx.fillText("Peso Oculta -> Output", this.NUMBERS_LEFT + 580, this.NUMBERS_TOP);
        ctx.fillText("Bias Output", this.NUMBERS_LEFT + 900, this.NUMBERS_TOP);

        this.fontePequena();
        this.numbersTop = 430;
        let numbersTop = this.numbersTop;

        this.printArray(this.redeNeural.weigths_ih.data, 80, numbersTop, 140, 30, this.CONNECTIONS_COLORS);
        this.printArray(this.redeNeural.bias_ih.data, 400, numbersTop, 140, 30, this.CONNECTIONS_COLORS);
        this.printArray(this.redeNeural.weigths_ho.data, 600, numbersTop, 140, 30, this.CONNECTIONS_COLORS);
        this.printArray(this.redeNeural.bias_ho.data, 1060, numbersTop, 140, 30, this.CONNECTIONS_COLORS);

        this.drawHidden();
        this.drawOutput();
        this.drawErro();

    }

    drawErro() {
        let numbersTop = 430;
        // this.mostrarErro = true;
        if (this.mostrarErro) {
            this.drawLine(20, numbersTop + 80, 1140, numbersTop + 80);

            this.fonteGrande('left');
            numbersTop += 110;
            ctx.fillText("Output Esperado", 20, numbersTop);
            ctx.fillText("Output Erro", 175, numbersTop);
            ctx.fillText("Dsigmoid (Output)", 290, numbersTop);
            // ctx.fillText("Dsigmoid -> x * (1-x)", 290, numbersTop);
            ctx.fillText("Gradiente", 480, numbersTop);
            ctx.fillText("Learning Rate", 590, numbersTop);
            ctx.fillText("Grad * Learn Rate", 710, numbersTop);
    
            this.fontePequena('left');
            this.printTextoArray(this.redeNeural.expected.data, 45, numbersTop + 30, 140, 30, this.CONNECTIONS_COLORS);
            this.printTextoArray(this.redeNeural.output_error.data, 150, numbersTop + 30, 140, 30);
            this.printTextoArray(this.redeNeural.d_output.data, 300, numbersTop + 30, 140, 30);
            this.printTextoArray(this.redeNeural.gradient.data, 450, numbersTop + 30, 140, 30);
            ctx.fillText(this.redeNeural.learning_rate, 625, numbersTop + 30);
            this.printTextoArray(this.redeNeural.gradientLR.data, 700, numbersTop + 30, 140, 30);

        }
    }

    drawHidden() {
        let numbersTop = 430;
        if (this.mostrarHidden) {
            this.drawLine(20, numbersTop + 80, 1140, numbersTop + 80);

            this.fonteGrande('left');
            numbersTop += 110;
            ctx.fillText("Cálculo do Hidden => Sigmoid -> 1 / (1 + Math.exp(-x))", this.NUMBERS_LEFT, numbersTop);
    
            this.fontePequena('left');
            this.printTextoArray(this.mostrarHiddenSig ? this.hiddenConta.outSig : this.hiddenConta.out, 15, numbersTop + 30, 140, 30, this.CONNECTIONS_COLORS);
        }
    }

    drawOutput() {
        let numbersTop = 530;
        if (this.mostrarOutput) {
            this.drawLine(20, numbersTop + 110, 1140, numbersTop + 110);

            this.fonteGrande('left');
            numbersTop += 140;
            ctx.fillText("Cálculo do Output => Sigmoid -> 1 / (1 + Math.exp(-x))", this.NUMBERS_LEFT, numbersTop);
    
            this.fontePequena('left');
            this.printTextoArray(this.mostrarOutputSig ? this.outputConta.outSig : this.outputConta.out, 15, numbersTop + 30, 140, 30, this.CONNECTIONS_COLORS);
        }
    }    

    printArray(data, posLeft, posTop, distLeft, distTop, cores) {
        for (let x = 0; x < data.length; x++) {
            const ar = data[x];
            for (let y = 0; y < ar.length; y++) {
                const item = ar[y];
                if (cores) {          
                    ctx.fillStyle = cores[x];                        
                }
                ctx.fillText(item, posLeft + (distLeft * y), posTop + (distTop * x));
            }
        }
    }

    printTextoArray(data, posLeft, posTop, distLeft, distTop, cores) {
        for (let x = 0; x < data.length; x++) {
            const item = data[x];
            if (cores) {          
                ctx.fillStyle = cores[x];                        
            }
            ctx.fillText(item, posLeft, posTop + (distTop * x));
        }
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
        const {x, y} = this.calcNeuronPosition(item, layer, totalNeuronsOnLayer, maxNeurons);
        ctx.beginPath();
        ctx.arc(x, y, this.NEURON_RAIO, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = this.NEURON_COLORS[layer];
        ctx.fill();

        if (value !== null) {
            this.font();
            if ((value + "").length < 5) {
                ctx.fillText(value, x, y + 6);
            } else {
                ctx.fillText(value, x, y - 22);
            }
        }
    }

    drawConnections(matrix, maxLenght) {
        let matrixPos = [];
        for (let layerIndex = 0; layerIndex < matrix.length; layerIndex++) {
            let arPos = [];
            const ar = matrix[layerIndex];
            for (let elemIndex = 0; elemIndex < ar.length; elemIndex++) {
                const valor = ar[elemIndex];
                arPos.push(this.calcNeuronPosition(elemIndex, layerIndex, ar.length, maxLenght));
            }
            matrixPos.push(arPos);
        }

        for (let layerIndex = 0; layerIndex < matrixPos.length - 1; layerIndex++) {
            const ar = matrixPos[layerIndex];
            for (let elemIndex = 0; elemIndex < ar.length; elemIndex++) {
                const elemPos = ar[elemIndex];
                const proxArray = matrixPos[layerIndex + 1];
                proxArray.forEach((elemProxPos, proxIndex) => {
                    this.drawLine(elemPos.x + this.NEURON_RAIO, elemPos.y, elemProxPos.x - this.NEURON_RAIO, elemProxPos.y, this.CONNECTIONS_COLORS[proxIndex]);
                });
            }
        }
    }

    drawLine(x, y, xTo, yTo, color) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(xTo, yTo);
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    calcNeuronPosition(item, layer, totalNeuronsOnLayer, maxNeurons) {
        let result = {x: 0, y: 0};

        result.x = this.NEURON_DIST + (this.NEURON_RAIO * 2) + (this.NEURON_DIST_LAT * layer);
        let colTotal = this.NEURON_DIST + (this.NEURON_RAIO * 2) + ((this.NEURON_RAIO * 2) * maxNeurons) + (this.NEURON_DIST * maxNeurons);
        let colTotalLayer = this.NEURON_DIST + (this.NEURON_RAIO * 2) + ((this.NEURON_RAIO * 2) * totalNeuronsOnLayer) + (this.NEURON_DIST * totalNeuronsOnLayer);
        result.y = ((colTotal - colTotalLayer) / 2) + this.NEURON_DIST + (this.NEURON_RAIO * 2) + ((this.NEURON_RAIO * 2) * item) + (this.NEURON_DIST * item);

        return result;
    }
    
};

