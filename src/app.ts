import { NeuralNetwork } from "brain.js";
import { Board, RandomBotPlayer, Square } from "./chess";
import { Player } from "./chess/interfaces";
import { iterate, joinArrays } from "./utils";

const player1: Player = new RandomBotPlayer();
const player2: Player = new RandomBotPlayer();

const play = async () => {
  const board = new Board(player1, player2);

  while (!board.gameOver) {
    board.markSquare(await board.getCurrentPlayerChoice());
  }

  return board;
};

const train = async () => {
  const net = new NeuralNetwork<number[], number[]>({
    hiddenLayers: [18, 18],
    binaryThresh: 0.5,
    iterations: 100,
    inputSize: 10,
    outputSize: 18,
    activation: "sigmoid",
  });
  const board = new Board(player1, player2);

  board.markSquare(await board.getCurrentPlayerChoice());
  board.markSquare(await board.getCurrentPlayerChoice());
  board.markSquare(await board.getCurrentPlayerChoice());

  net.train([...board.networkAvaibleSquares, ...board.networkSquares]);

  const a = iterate(board.networkAvaibleSquares, (square) => square.input);
  const b = iterate(board.networkSquares, (square) => square.input);

  const output = net.run([...a[0]]);

  console.log(output);
};

train();
