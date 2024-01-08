import { NeuralNetwork } from "brain.js";
import { Choice } from "../choice";
import { Board } from "../board";
import { Player } from "../interfaces";
import { Square } from "../square";

export class NetBotPlayer implements Player {
    readonly isBot = true;

    constructor(private readonly net: NeuralNetwork<number[], number[]>) {}

    async getChoice(board: Board): Promise<Choice> {
        const bestSquare = await this.bestSquare(board);
        return new Choice(board, bestSquare);
    }

    async bestSquare(board: Board): Promise<Square> {
        let bestSquare: Square | undefined = undefined;
        let bestScore = Number.MIN_SAFE_INTEGER;

        for (let square of board.avaibleSquares) {
            let bitBoard = board.getBoardAsDouble(true);

            bitBoard[square.index] = 1;

            const output = this.net.run(bitBoard);
            const score = output[0];

            if (score > bestScore) {
                bestScore = score;
                bestSquare = square;
            }
        }

        if (bestSquare === undefined) {
            throw new Error("No best score found");
        }

        return bestSquare!;
    }
}
