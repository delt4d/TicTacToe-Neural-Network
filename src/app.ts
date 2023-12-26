import net from "./net";
import { Board, RandomBotPlayer } from "./tic-tac-toe";
import { NetBotPlayer } from "./tic-tac-toe/player/net-bot";
import { readFile } from "./utils";

start();

async function start() {
    await loadTrainedData();

    const board = new Board(new NetBotPlayer(net), new RandomBotPlayer());

    while (!board.gameOver) {
        const choice = await board.getCurrentPlayerChoice();

        if (!board.markSquare(choice)) {
            throw new Error("Bad choice");
        }
    }

    console.log([
        !board.hasWinner ? 0 : board.winner == board.playerOne ? "x" : "o",
    ]);
    console.log(board.niceSquares());
}

async function loadTrainedData() {
    try {
        const content = await readFile("net.json");
        const json = JSON.parse(content);

        net.fromJSON(json);
    } catch (err) {
        throw new Error("Could not read net.json, try run `npm run train`");
    }
}
