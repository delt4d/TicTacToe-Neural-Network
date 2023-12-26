import { NeuralNetwork } from "brain.js";

export const createNet = () =>
    new NeuralNetwork<number[], number[]>({
        hiddenLayers: [18],
        binaryThresh: 0.5,
        iterations: 50,
        inputSize: 9,
        outputSize: 9,
        activation: "sigmoid",
        learningRate: 0.025,
    });

const net = createNet();

export default net;
