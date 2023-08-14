import { Board } from './board/board';
import { ConsoleGame } from './game/console-game';
import { Game } from './game/game';
import { HumanPlayer } from './player/human-player';
import { AIBot } from './player/ai-player';
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
(4) - Human x AI Bot
(5) - Random Bot x AI Bot
(6) - AI Bot x AI Bot`);

const playersChoice = chooseOption([1, 2, 3, 4, 5, 6]);

const getAIBot = (symbol: string) => {
    const net = new brain.NeuralNetwork<number[], number[]>();
    const json = JSON.parse(readFile(__dirname + "/data/trained.txt"));

    net.fromJSON(json);

    return new AIBot(symbol, net);
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
        player2 = getAIBot('Y');
        break;
    case 5:
        player1 = new RandomBot('X');
        player2 = getAIBot('Y');
        break;
    case 6:
        player1 = getAIBot('X');
        player2 = getAIBot('Y');
        break;
}

const board = new Board();
const game: Game = new ConsoleGame(board, player1!, player2!);

run(game);