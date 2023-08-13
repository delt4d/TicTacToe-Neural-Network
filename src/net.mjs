import brain from "brain.js";

const net = new brain.NeuralNetwork()
net.train([
    { input: [0, 0], output: [0, 0] },
    { input: [1, 0], output: [1, 0] },
    { input: [0, 1], output: [0, 1] },
    { input: [1, 1], output: [0, 0] },
]);

const output = net.run([0, 1]);
console.log(output);