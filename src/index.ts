import { Board } from './board/board';
import { ConsoleGame } from './game/console-game';
import { Game } from './game/game';
import { HumanPlayer } from './player/human-player';
import { Player } from './player/player';
import { RandomBot } from './player/random-bot';
import { run } from './run';
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
(3) - Human x Random Bot`);

const playersChoice = chooseOption([1, 2, 3]);

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
}

const board = new Board();
const game: Game = new ConsoleGame(board, player1!, player2!);

run(game);