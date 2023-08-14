import { Player } from '../player/player';
import { Square } from './square';

export class Board {
    private _squares: Array<Square> = [];

    static winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    constructor() {
        for (let i = 0; i < 9; i++) {
            this._squares.push(new Square(i, null));
        }
    }

    /**
     * Sets the given square in the array of squares.
     *
     * @param {Square} square - The square to be set.
     * @return {boolean} Returns true if the square was set successfully, false otherwise.
     */
    private setSquare(square: Square): boolean {
        if (this._squares[square.index].isNull()) {
            this._squares[square.index] = square;
            return true;
        }

        return false;
    }

    /**
     * Returns an array of empty squares.
     *
     * @return {Array<Square>} An array of empty squares.
     */
    get emptySquares(): Array<Square> {
        return [...this._squares.filter(square => square.isNull())];
    }

    /**
     * Marks a square on the game board with the specified index for the specified player.
     *
     * @param {number} index - The index of the square to mark.
     * @param {Player} player - The player who is marking the square.
     * @return {boolean} - The updated square after it has been marked.
     */
    markSquare(index: number, player: Player): boolean {
        return this.setSquare(new Square(index, player));
    }

    /**
     * Retrieves the squares.
     *
     * @return {Square[]} The squares.
     */
    getSquares(): Square[] {
        return this._squares;
    }

    /**
     * Returns an array of numbers representing the relationship of each square in the network to the player.
     *
     * @param {Player} player - The player whose relationship to the squares is being calculated.
     * @return {Array<0 | 1 | -1>} - An array of numbers representing the relationship of each square to the player. A value of 0 indicates that the square is null, 1 indicates that the square belongs to the player, and -1 indicates that the square belongs to the opponent.
     */
    getSquaresToNetwork(player: Player): Array<0 | 1 | -1> {
        return this._squares.map(square => square.isNull() ? 0 : (square.value === player ? 1 : -1))
    }

    /**
     * Determines if the game is over.
     *
     * @return {boolean} True if the game is over, false otherwise.
     */
    isGameOver(): boolean {
        return this.isBoardFull() || this.isGameWon();
    }

    /**
     * Checks if the game has been won.
     *
     * @return {boolean} Returns true if the game has been won, otherwise false.
     */
    isGameWon(): boolean {
        return Board.winningCombinations.some(combination => {
            const squares = combination.map(pos => this._squares[pos]);
            return !squares[0].isNull() && squares.every(square => square.value === squares[0].value);
        });
    }

    /**
     * Checks if the board is full.
     *
     * @return {boolean} Returns true if every square is not null, false otherwise.
     */
    isBoardFull(): boolean {
        return this._squares.every(square => !square.isNull());
    }
}