import { Board } from "./board";
import { Square } from "./square";

export class Choice {
    public readonly state: Board;
    public readonly square: Square;

    constructor(state: Board, square: Square) {
        this.state = state;
        this.square = square;
    }
}
