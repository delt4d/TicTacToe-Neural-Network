import { Board } from '../board/board';
import { Player } from '../player/player';
import { RandomBot } from '../player/random-bot';
import { Game, GameResult } from './game';
import brain from "brain.js"

interface InputType { }
interface OutputType { }

export class NetGame implements Game {
    public player1: Player;
    public player2: Player;
    private net: brain.NeuralNetwork<InputType, OutputType>;

    constructor(
        public board: Board
    ) {
        this.player1 = new RandomBot('X');
        this.player2 = new RandomBot('Y');
        this.net = new brain.NeuralNetwork<InputType, OutputType>();
    }

    run(): Promise<GameResult> {
        throw new Error('Method not implemented.');
    }
}