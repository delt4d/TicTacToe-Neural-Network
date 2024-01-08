import { Prompt } from "prompt-sync";
import { Player } from "../interfaces";
import { Choice } from "../choice";
import { Board } from "../board";
import { Square } from "../square";

export class ConsolePlayer implements Player {
    readonly isBot = false;

    constructor(private readonly prompt: Prompt) {}

    getChoice(board: Board): Promise<Choice> {
        const avaibleSquares = board.avaibleSquares;
        const symbol = board.isPlayerOneTurn() ? "✖" : "●";

        while (true) {
            const input = parseInt(
                this.prompt(`Choose a square (Player ${symbol}): `)
            );

            const isAvaibleSquare = avaibleSquares.some(
                (square) => square.index === input
            );

            if (!isNaN(input) && isAvaibleSquare) {
                const square = new Square(input, this);
                const choice = new Choice(board, square);

                return Promise.resolve(choice);
            }

            console.log("Invalid move. Try again.");
        }
    }
}
