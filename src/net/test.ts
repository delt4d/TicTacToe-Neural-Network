import net from ".";
import { loop, readFile, sleep, watchFile } from "../utils";
import { NetBotPlayer } from "../tic-tac-toe/player/net-bot";
import { Board, RandomBotPlayer } from "../tic-tac-toe";
import { Player } from "../tic-tac-toe/interfaces";

let randomBotWins = 0;
let netWins = 0;
let ties = 0;
let maxGames = 100;

createTrainedNet().then(() => next());

watchFile("net.json", async (event) => {
    if (event === "change") {
        randomBotWins = 0;
        netWins = 0;
        ties = 0;

        await createTrainedNet();
    }
});

async function next() {
    const possibleGames = maxGames;

    print();
    createTrainedNet();

    for (let _ of loop(possibleGames)) {
        play((winner) => {
            if (!winner) {
                ++ties;
            } else if (winner instanceof NetBotPlayer) {
                ++netWins;
            } else {
                ++randomBotWins;
            }
        });
    }

    await sleep(100);

    return next();
}

function print() {
    console.clear();
    console.log(`
Random bot wins: ${randomBotWins}
Net wins: ${netWins}
Ties: ${ties}
    `);
}

async function play(callback: (winner: Player | null) => void) {
    const board = new Board(new NetBotPlayer(net), new RandomBotPlayer());

    while (!board.gameOver) {
        const choice = await board.getCurrentPlayerChoice();

        if (!board.markSquare(choice)) {
            throw new Error("Bad choice");
        }
    }

    callback(board.hasWinner ? board.winner : null);
}

async function createTrainedNet() {
    try {
        const content = await readFile("net.json");
        const json = JSON.parse(content);

        net.fromJSON(json);

        return net;
    } catch (err) {
        console.error(" Could not read net.json");
    }
}
