import { NeuralNetwork } from "brain.js";

const net = new NeuralNetwork<number[], number[]>({
    hiddenLayers: [36, 36],
    binaryThresh: 0.5,
    iterations: 100,
    inputSize: 9,
    outputSize: 9,
    activation: "sigmoid",
    learningRate: 0.025,
});

export default net;
