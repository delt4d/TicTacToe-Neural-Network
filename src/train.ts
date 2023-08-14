import brain = require("brain.js");
import { trainingData } from './data/data';
import { saveFile } from './utils';

const net = new brain.NeuralNetwork<number[], number[]>({
    hiddenLayers: [9, 9],
    binaryThresh: 0.5,
    iterations: 100,
    outputSize: 9,
    activation: 'sigmoid'
});

const prepared = trainingData.map(set => {
    return {
        input: set.slice(0, 9),
        output: set.slice(9)
    }
});

net.train(prepared);

saveFile(__dirname + '/data/trained.txt', JSON.stringify(net.toJSON()));