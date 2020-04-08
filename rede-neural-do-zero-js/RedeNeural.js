function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function dsigmoid(x){
    return x * (1-x); 
}

class RedeNeural {
    constructor(i_nodes, h_nodes, o_nodes) {
        this.i_nodes = i_nodes;
        this.h_nodes = h_nodes;
        this.o_nodes = o_nodes;

        this.bias_ih = new Matrix(this.h_nodes, 1);
        this.bias_ih.randomize();
        this.bias_ho = new Matrix(this.o_nodes, 1);
        this.bias_ho.randomize();

        this.weigths_ih = new Matrix(this.h_nodes, this.i_nodes);
        this.weigths_ih.randomize()

        this.weigths_ho = new Matrix(this.o_nodes, this.h_nodes)
        this.weigths_ho.randomize()

        this.learning_rate = 0.1;
    }

    contaMult(weight, hidden, bias) {
        let out = [];
        let outSig = [];
        for (let x = 0; x < weight.data.length; x++) {
            let strOut = "";
            let sum = 0;
            for (let y = 0; y < weight.data[x].length; y++) {
                const w1 = weight.data[x][y];
                const h1 = hidden.data[y][0];
                strOut += "(" + w1 + " * " + h1 + ") + ";
                sum += w1 * h1;
            }
            const b1 = bias.data[x][0];
            strOut += b1;
            sum += b1;
            strOut += " = " + sum;
            let sig =" => sig (" + sum + ") = " + sigmoid(sum);

            out.push(strOut);
            outSig.push(strOut + sig);
        }
        return {out, outSig};
    }

    train(arr, target, backProgragation) {
        // INPUT -> HIDDEN
        let input = Matrix.arrayToMatrix(arr);
        this.input = arr;
        let hidden = Matrix.multiply(this.weigths_ih, input);
        hidden = Matrix.add(hidden, this.bias_ih);
        this.hidden = hidden;
        this.hiddenConta = this.contaMult(this.weigths_ih, input, this.bias_ih);

        hidden.map(sigmoid)

        // HIDDEN -> OUTPUT
        // d(Sigmoid) = Output * (1- Output)
        let output = Matrix.multiply(this.weigths_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);
        this.output = output;
        this.outputConta = this.contaMult(this.weigths_ho, hidden, this.bias_ho);

        // BACKPROPAGATION
        if (backProgragation) {
            // OUTPUT -> HIDDEN
            let expected = Matrix.arrayToMatrix(target);
            let output_error = Matrix.subtract(expected, output);
            let d_output = Matrix.map(output,dsigmoid);
            let hidden_T = Matrix.transpose(hidden);

            let gradient = Matrix.hadamard(d_output,output_error);
            gradient = Matrix.escalar_multiply(gradient, this.learning_rate);
            this.gradient = gradient;
            
            // Adjust Bias O->H
            this.bias_ho = Matrix.add(this.bias_ho, gradient);
            // Adjust Weigths O->H
            let weigths_ho_deltas = Matrix.multiply(gradient,hidden_T);
            this.weigths_ho = Matrix.add(this.weigths_ho, weigths_ho_deltas);

            // HIDDEN -> INPUT
            let weigths_ho_T = Matrix.transpose(this.weigths_ho);
            let hidden_error = Matrix.multiply(weigths_ho_T, output_error);
            let d_hidden = Matrix.map(hidden,dsigmoid);
            let input_T = Matrix.transpose(input);

            let gradient_H = Matrix.hadamard(d_hidden,hidden_error);
            gradient_H = Matrix.escalar_multiply(gradient_H, this.learning_rate);
            this.gradient_H = gradient_H;

            // Adjust Bias O->H
            this.bias_ih = Matrix.add(this.bias_ih, gradient_H);
            // Adjust Weigths H->I
            let weigths_ih_deltas = Matrix.multiply(gradient_H, input_T);
            this.weigths_ih = Matrix.add(this.weigths_ih, weigths_ih_deltas);
        }

    }

    predict(arr){
        // INPUT -> HIDDEN
        let input = Matrix.arrayToMatrix(arr);

        let hidden = Matrix.multiply(this.weigths_ih, input);
        hidden = Matrix.add(hidden, this.bias_ih);

        hidden.map(sigmoid)

        // HIDDEN -> OUTPUT
        let output = Matrix.multiply(this.weigths_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);
        output = Matrix.MatrixToArray(output);

        return output;
    }
}