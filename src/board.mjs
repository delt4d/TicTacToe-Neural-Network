import { Player } from './player.mjs';

export class Board {
    /** @type {Array<string | null>} */
    #places;

    constructor() {
        this.#places = Array(9).fill(null);
    }

    get gameIsOver() {
        return this.isBoardFull() || this.isGameWon();
    }

    static get winningCombinations() {
        return [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    }

    /**
     *
     * @returns {Array<string>}
     */
    getPlaces() {
        return [
            ...this.#places.map((cell, index) =>
                cell !== null ? cell : `${index}`
            ),
        ];
    }

    /**
     *
     * @returns {Array<number>}
     */
    getPlacesNet() {
        return [
            ...this.#places.map((cell, index) =>
                cell !== null ? (this.symbol === cell ? 1 : -1) : 0
            ),
        ];
    }

    /**
     *
     * @returns {Array<number>}
     */
    getEmptyCells() {
        return this.#places
            .map((cell, index) => (!cell ? index : null))
            .filter((c) => c !== null);
    }

    /**
     *
     * @param {Player} player
     * @param {number} position
     * @returns {boolean}
     */
    makeMove(player, position) {
        if (this.#places[position] === null) {
            this.#places[position] = player.symbol;
            return true;
        }
        return false;
    }

    /**
     *
     * @returns {boolean}
     */
    isGameWon() {
        return Board.winningCombinations.some((combination) => {
            const values = combination.map((pos) => this.#places[pos]);
            return (
                values[0] !== null && values.every((value) => value === values[0])
            );
        });
    }

    /**
     *
     * @returns {boolean}
     */
    isBoardFull() {
        return this.#places.every((cell) => cell !== null);
    }
}
