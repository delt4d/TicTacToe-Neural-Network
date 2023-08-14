import { Board } from '../board/board';
import { HumanPlayer } from '../player/human-player';
import { IaBot } from '../player/ia-player';
import { Player } from '../player/player';
import { RandomBot } from '../player/random-bot';
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
        const trainingData = await this.getTrainingData();

        this.net.train(trainingData);

        let currentPlayer = this.player1;

        while (!this.board.isGameOver()) {
            const move = await currentPlayer.getChoice(this.board);
            this.board.markSquare(move, currentPlayer);
            currentPlayer = currentPlayer === this.player1 ? this.player2 : this.player1;
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

    private async getTrainingData() {
        const trainingData = [];

        trainingData.push({
            input: [1, 0, -1, 0, 1, 0, -1, 0, 1],
            output: [0, 0, 0, 0, 0, 0, 0, 0, 1]
        });

        trainingData.push({
            input: [0, 0, -1, 0, 1, 0, -1, 0, 1],
            output: [1, 0, 0, 0, 0, 0, 0, 0, 0]
        });

        trainingData.push({
            input: [0, 0, -1, 0, 1, 0, -1, 0, 0],
            output: [0, 0, 0, 0, 0, 0, 1, 0, 0]
        });

        trainingData.push({
            input: [1, 0, -1, 0, 1, 0, 0, 0, 0],
            output: [0, 0, 0, 1, 0, 0, 0, 0, 0]
        });

        trainingData.push({
            input: [1, 0, -1, 0, 1, 0, -1, 0, 0],
            output: [0, 0, 0, 0, 0, 0, 0, 1, 0]
        });

        trainingData.push({
            input: [0, 0, -1, 0, 1, 0, 0, 0, 0],
            output: [0, 0, 0, 0, 0, 0, 0, 0, 1]
        });

        trainingData.push({
            input: [1, -1, 0, 0, 1, 0, -1, 0, 0],
            output: [0, 0, 1, 0, 0, 0, 0, 0, 0]
        });

        trainingData.push({
            input: [0, -1, 0, 1, 1, 0, -1, 0, 0],
            output: [0, 0, 0, 0, 0, 1, 0, 0, 0]
        });

        trainingData.push({
            input: [1, -1, 0, 0, 1, 0, 0, -1, 0],
            output: [0, 0, 0, 0, 0, 0, 1, 0, 0]
        });

        trainingData.push({
            input: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            output: [1, 1, 1, 1, 1, 1, 1, 1, 1]
        });

        trainingData.push({
            input: [0, 0, 0, 0, 1, -1, 0, 0, 0],
            output: [0, 0, 1, 0, 0, 0, 0, 0, 0]
        });

        trainingData.push({
            input: [0, 0, 0, 0, 0, 0, 0, 0, -1],
            output: [0, 0, 0, 0, 0, 0, 0, 1, 0]
        });

        trainingData.push({
            input: [0, 0, 0, 0, 0, 0, 0, -1, 0],
            output: [0, 0, 0, 0, 0, 0, 1, 0, 0]
        });

        trainingData.push({
            input: [0, 0, 0, 0, 0, 0, -1, 0, 0],
            output: [0, 0, 0, 0, 0, 1, 0, 0, 0]
        });

        trainingData.push({
            input: [0, 0, 0, 0, 0, -1, 0, 0, 0],
            output: [0, 0, 0, 0, 1, 0, 0, 0, 0]
        });

        trainingData.push({
            input: [0, 0, 0, 0, -1, 0, 0, 0, 0],
            output: [0, 0, 0, 1, 0, 0, 0, 0, 0]
        });

        trainingData.push({
            input: [0, 0, 0, -1, 0, 0, 0, 0, 0],
            output: [0, 0, 1, 0, 0, 0, 0, 0, 0]
        });

        trainingData.push({
            input: [0, 0, -1, 0, 0, 0, 0, 0, 0],
            output: [0, 1, 0, 0, 0, 0, 0, 0, 0]
        });

        trainingData.push({
            input: [0, -1, 0, 0, 0, 0, 0, 0, 0],
            output: [1, 0, 0, 0, 0, 0, 0, 0, 0]
        });

        trainingData.push({
            input: [-1, 0, 0, 0, 0, 0, 0, 0, 0],
            output: [0, 0, 0, 0, 0, 0, 0, 0, 1]
        });

        trainingData.push({
            input: [1, 1, -1, -1, 0, 0, 0, 0, 0],
            output: [0, 0, 0, 0, 0, 0, 0, 0, 1]
        });

        trainingData.push({
            input: [0, 0, 0, 0, 0, 0, -1, -1, 1],
            output: [1, 0, 0, 0, 0, 0, 0, 0, 0]
        });

        trainingData.push({
            input: [0, 0, 0, 0, 0, 0, 1, -1, -1],
            output: [0, 0, 0, 0, 0, 0, 1, 0, 0]
        });

        return trainingData;
    }
}