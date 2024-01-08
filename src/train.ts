import net from "./net";
import { Board, RandomBotPlayer } from "./tic-tac-toe";
import { loop, saveFile } from "./utils";

const numIterations = 520;
const inputs: number[][] = [];
const outputs: number[][] = [];

console.log("Training...");
start().finally(() => console.log("Done training."));

async function start() {
  for (let i of loop(numIterations)) {
    const board = new Board(new RandomBotPlayer(), new RandomBotPlayer());

    while (!board.gameOver) {
      const choice = await board.getCurrentPlayerChoice();

      if (!board.markSquare(choice)) {
        throw new Error("Bad choice");
      }

      inputs.push(board.getBoardAsDouble(!board.currentIsPlayerOne()));
    }

    process.stdout.write(".");

    const output = board.isFull ? 0 : board.winnerIsPlayerOne() ? 1 : -1;

    loop(inputs.length).forEach((_, index) => {
      const n = index % 2 === 0 ? 1 : -1;
      outputs.push([output * n]);
    });

    net.train(
      inputs.map((input, index) => ({
        input,
        output: outputs[index],
      }))
    );
  }

  console.log("Saving training data...");
  const json = net.toJSON();
  await saveFile("net.json", JSON.stringify(json));
  console.log("Training data saved successfully");
}
