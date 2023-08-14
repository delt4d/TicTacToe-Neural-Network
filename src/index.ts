import { Board } from './board/board';
import { ConsoleGame } from './game/console-game';
import { Game } from './game/game';
import { HumanPlayer } from './player/human-player';
import { IaBot } from './player/ia-player';
import { Player } from './player/player';
import { RandomBot } from './player/random-bot';
import { run } from './run';
import { readFile } from './utils';
import brain = require("brain.js");
import promptSync from 'prompt-sync';

const prompt = promptSync({ sigint: true });

const chooseOption = (options: number[]): number => {
    while (true) {
        const choice = parseInt(prompt('-> '));

        if (!isNaN(choice) && options.includes(choice)) {
            console.log('\n');
            return choice;
        }

        console.log('Invalid option.');
    }
}

console.clear();
console.log(`
***************
* TIC TAC TOE *
***************

Choose one of the following options:
(1) - Human x Human
(2) - Random Bot x Random Bot
(3) - Human x Random Bot
(4) - Human x IA Bot
(5) - Random Bot x IA Bot
(6) - IA Bot x IA Bot`);

const playersChoice = chooseOption([1, 2, 3, 4, 5, 6]);

const getIABot = (symbol: string) => {
    const net = new brain.NeuralNetwork<number[], number[]>();
    const json = JSON.parse(readFile(__dirname + "/data/trained.txt"));

    net.fromJSON(json);

    return new IaBot(symbol, net);
}

let player1: Player;
let player2: Player;

switch (playersChoice) {
    case 1:
        player1 = new HumanPlayer('X');
        player2 = new HumanPlayer('Y');
        break;
    case 2:
        player1 = new RandomBot('X');
        player2 = new RandomBot('Y');
        break;
    case 3:
        player1 = new HumanPlayer('X');
        player2 = new RandomBot('Y');
        break;
    case 4:
        player1 = new HumanPlayer('X');
        player2 = getIABot('Y');
        break;
    case 5:
        player1 = new RandomBot('X');
        player2 = getIABot('Y');
        break;
    case 6:
        player1 = getIABot('X');
        player2 = getIABot('Y');
        break;
}

const board = new Board();
const game: Game = new ConsoleGame(board, player1!, player2!);

run(game);