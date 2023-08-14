import brain from "brain.js";
import { Board } from '../board/board';
import { Player } from './player';

export class IaBot implements Player {
    public readonly isBot = true;

    constructor(
        public readonly symbol: string,
        private readonly net: brain.NeuralNetwork<number[], number[]>
    ) { }

    /**
     * Retrieves a choice from the board asynchronously.
     *
     * @param {Board} board - The board object from which to retrieve the choice.
     * @return {Promise<number>} A promise that resolves to the retrieved choice.
     */
    async getChoice(board: Board): Promise<number> {
        const currentState = board.getSquaresToNetwork(this);
        const actionValues = this.net.run(currentState);
        const choice = actionValues.indexOf(Math.max(...actionValues));
        return choice;
    }
}