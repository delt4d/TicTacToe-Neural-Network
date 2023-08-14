import { Board } from '../board/board';
import { IaBot } from '../player/ia-player';
import { Player } from '../player/player';
import { Game, GameResult } from './game';
import brain from "brain.js"
type InputType = number[];
type OutputType = number[];

export class NetGame implements Game {
    public player1: Player;
    public player2: Player;

    constructor(
        public board: Board,
        private net: brain.NeuralNetwork<InputType, OutputType>
    ) {
        this.player1 = new IaBot('X', this.net);
        this.player2 = new IaBot('Y', this.net);
    }

    async run(): Promise<GameResult> {
        let currentPlayer = this.player1;

        while (!this.board.isGameOver()) {
            const move = await currentPlayer.getChoice(this.board);

            if (this.board.markSquare(move, currentPlayer)) {
                currentPlayer = currentPlayer === this.player1 ? this.player2 : this.player1;
            }
        }

        if (this.board.isBoardFull() && !this.board.isGameWon()) {
            return {
                isGameTied: true,
                winner: null
            }
        }

        return {
            isGameTied: false,
            winner: currentPlayer
        }
    }
}