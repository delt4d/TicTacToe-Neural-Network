import net from "./net";
import promptSync from "prompt-sync";
import { readFile, sleep } from "./utils";
import { Board, RandomBotPlayer } from "./tic-tac-toe";
import { NetBotPlayer } from "./tic-tac-toe/player/net-bot";
import { Player } from "./tic-tac-toe/interfaces";
import { ConsolePlayer } from "./tic-tac-toe/player/console-player";

const prompt = promptSync({ sigint: true });

console.clear();
start();

async function start() {
    console.log(`
   ***************
   * TIC TAC TOE *
   ***************

   Choose one of the following options:
   (1) - Human x Human
   (2) - Random Bot x Random Bot
   (3) - Human x Random Bot
   (4) - Human x AI Bot
   (5) - Random Bot x AI Bot
   (6) - AI Bot x AI Bot
   (7) - Exit`);

    const playersChoice = chooseOption([1, 2, 3, 4, 5, 6, 7]);

    let player1: Player;
    let player2: Player;

    switch (playersChoice) {
        case 1:
            player1 = getConsolePlayer();
            player2 = getConsolePlayer();
            break;
        case 2:
            player1 = getRandomBot();
            player2 = getRandomBot();
            break;
        case 3:
            player1 = getConsolePlayer();
            player2 = getRandomBot();
            break;
        case 4:
            player1 = getConsolePlayer();
            player2 = await getAIBot();
            break;
        case 5:
            player1 = getRandomBot();
            player2 = await getAIBot();
            break;
        case 6:
            player1 = await getAIBot();
            player2 = await getAIBot();
            break;
        case 7:
            console.log("\nBye!");
            return;
        default:
            console.log("Invalid option.");
            return start();
    }

    await play(player1, player2);
}

function chooseOption(options: number[]): number {
    while (true) {
        const choice = parseInt(prompt("-> "));

        if (!isNaN(choice) && options.includes(choice)) {
            console.log("\n");
            return choice;
        }

        console.log("Invalid option.");
    }
}

function getRandomBot() {
    return new RandomBotPlayer();
}

function getConsolePlayer() {
    return new ConsolePlayer(prompt);
}

async function getAIBot() {
    const json = await readFile("net.json");

    net.fromJSON(JSON.parse(json));

    return new NetBotPlayer(net);
}

async function play(player1: Player, player2: Player) {
    const board = new Board(player1, player2);

    while (true) {
        console.log("\n-------------------");
        displayCurrentPlayer();
        displayBoard();
        console.log("-------------------");

        if (board.gameOver) break;

        const choice = await board.getCurrentPlayerChoice();

        if (board.currentPlayer.isBot) {
            const playerName = getPlayerName(board.currentPlayer);
            console.log(`* ${playerName} CHOSE: ${choice.square.index}`);
            await sleep(1000);
        }
        console.log("-------------------");

        board.markSquare(choice);
    }

    console.log("\n-------------------");
    displayBoard();
    console.log("\n-------------------");

    if (board.isFull && !board.hasWinner) {
        console.log("* DRAW");
    } else {
        const playerOneWins = board.winner === board.playerOne;
        const playerName = getPlayerName(board.winner!);

        console.log(`* WINNER ${playerOneWins ? "✖" : "●"}: ${playerName}`);
    }
    console.log("-------------------");

    await sleep(1000);

    console.log("\n\n");

    return start();

    function displayBoard() {
        const squares = board.squares.map((square, index) =>
            square.isNull ? index : square.value === board.playerOne ? "✖" : "●"
        );

        console.log("*");
        console.log(`*     |${squares[0]}|${squares[1]}|${squares[2]}|`);
        console.log(`*     |${squares[3]}|${squares[4]}|${squares[5]}|`);
        console.log(`*     |${squares[6]}|${squares[7]}|${squares[8]}|`);
    }

    function displayCurrentPlayer() {
        console.log(`* CURRENT PLAYER: ${board.isPlayerOneTurn() ? "✖" : "●"}`);
    }

    function getPlayerName(player: Player) {
        const isPlayerOne = player === player1;

        if (!player.isBot) return isPlayerOne ? "PLAYER 1" : "PLAYER 2";

        return (
            (player instanceof NetBotPlayer ? "AI BOT" : "RANDOM BOT") +
            ` ${isPlayerOne ? 1 : 2}`
        );
    }
}
