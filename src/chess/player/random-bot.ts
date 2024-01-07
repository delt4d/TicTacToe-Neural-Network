import { Player } from "../interfaces";
import { oneBetween } from "../../utils";
import { Board } from "../board";
import { Choice } from "../choice";
import { Square } from "../square";

export class RandomBotPlayer implements Player {
    readonly isBot = true;

    getChoice(board: Board): Promise<Choice> {
        const avaibleSquares = board.avaibleSquares;
        const choiceIndex = oneBetween(0, avaibleSquares.length);
        const square = new Square(choiceIndex, this);
        const choice = new Choice(board, square);

        return Promise.resolve(choice);
    }
}
