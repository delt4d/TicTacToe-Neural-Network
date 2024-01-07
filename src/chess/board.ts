import { Player } from "./interfaces";
import { Square } from "./square";
import { every, iterate, loop, some, switchb, toggle, where } from "../utils";
import { GameHistory } from "./game-history";
import { Choice } from "./choice";

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export class Board {
    private _currentPlayer: Player;
    private _player1: Player;
    private _player2: Player;
    private _squares: Square[] = [];

    public readonly gameHistory: GameHistory;

    constructor(player1: Player, player2: Player, squares?: Square[]) {
        for (let i of loop(9)) {
            const square = squares?.[i] || new Square(i, null);
            this._squares.push(square);
        }
        this._player1 = player1;
        this._player2 = player2;
        this._currentPlayer = player1;
        this.gameHistory = new GameHistory();
    }

    getCurrentPlayerIsPlayerOne() {
        return this._currentPlayer === this._player1;
    }

    getCurrentPlayerChoice() {
        return this._currentPlayer.getChoice(this);
    }

    markSquare(choice: Choice) {
        const index = choice.square.index;

        if (!this.checkSquareIsNull(index)) {
            return false;
        }
        const square = new Square(index, this._currentPlayer);

        this.history.pushHistoryItem(this.clone());
        this.switchCurrentPlayer();
        this.setSquare(square);

        return true;
    }

    checkSquareIsNull(index: number) {
        return this._squares[index].isNull;
    }

    clone(): Board {
        const squares: Square[] = [];

        for (let i of loop(this._squares.length)) {
            squares.push(this._squares[i]);
        }

        return new Board(this._player1, this._player2, squares);
    }

    get squares() {
        return this._squares;
    }

    get playerOne() {
        return this._player1;
    }

    get playerTwo() {
        return this._player2;
    }

    get history() {
        return this.gameHistory;
    }

    get currentPlayer() {
        return this._currentPlayer;
    }

    get networkSquares(): { input: number[]; output: number[] }[] {
        return iterate(this._squares, (square) => {
            return {
                input: [square.index],
                output: [
                    square.isNull
                        ? 0
                        : switchb(square.value === this.currentPlayer, 1, -1),
                ],
            };
        });
    }

    get avaibleSquares() {
        return where(this._squares, (square) => !square.isNull);
    }

    get networkAvaibleSquares(): { input: number[]; output: number[] }[] {
        return iterate(
            where(this._squares, (square) => !square.isNull),
            (square) => ({
                input: [square.index],
                output: [switchb(square.value === this.currentPlayer, 1, -1)],
            })
        );
    }

    get gameOver() {
        return this.isFull || this.hasWinner;
    }

    get hasWinner() {
        return some(winningCombinations, (combination) => {
            const squares = iterate(combination, (pos) => this._squares[pos]);
            if (squares[0].isNull) return false;
            return every(squares, (square) => square.value === squares[0].value);
        });
    }

    get isFull() {
        return every(this._squares, (square) => !square.isNull);
    }

    private switchCurrentPlayer() {
        this._currentPlayer = toggle(
            this._currentPlayer,
            this._player1,
            this._player2
        );
    }

    private setSquare(square: Square) {
        this._squares[square.index].update(square);
    }
}
