import promptSync from 'prompt-sync';
import { Board } from '../board/board';
import { Player } from './player';

export class HumanPlayer implements Player {
    public readonly isBot = false;
    private readonly prompt: promptSync.Prompt;

    constructor(public readonly symbol: string) {
        this.prompt = promptSync({ sigint: true })
    }

    /**
     * Retrieves the player's choice from the given board.
     *
     * @param {Board} board - The game board to retrieve the choice from.
     * @return {Promise<number>} A promise that resolves with the player's choice.
     */
    getChoice(board: Board): Promise<number> {
        const emptySquares = board.emptySquares;

        while (true) {
            const choice = parseInt(this.prompt(`Choose a square (Player ${this.symbol}): `));

            if (!isNaN(choice) && emptySquares.some(square => square.index === choice)) {
                return Promise.resolve(choice);
            }

            console.log('Invalid move. Try again.');
        }
    }
}