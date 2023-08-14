import { Board } from '../board/board';
import { randomBetween } from '../utils';
import { Player } from './player';

export class RandomBot implements Player {
    public readonly isBot = true;

    constructor(public readonly symbol: string) { }

    /**
     * Retrieves a random choice from the given board.
     *
     * @param {Board} board - The board to get the choice from.
     * @return {Promise<number>} A promise that resolves to the index of the chosen square.
     */
    async getChoice(board: Board): Promise<number> {
        const choice = Math.floor(randomBetween(0, board.emptySquares.length));
        return board.emptySquares[choice].index;
    }
}