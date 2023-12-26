import { Board } from "../board/board";
import { Player } from "../player/player";
import { sleep } from "../utils";
import { Game } from "./game";
import { GameHistory } from "../board/history";

export class ConsoleGame implements Game {
    private _history: GameHistory;
    private currentPlayer: Player;

    constructor(
        public board: Board,
        public player1: Player,
        public player2: Player
    ) {
        this.currentPlayer = player1;
        this._history = new GameHistory();
    }

    private displayBoard() {
        const squares = this.board.getSquares();

        console.log(`*
*     |${squares[0].value?.symbol || squares[0].index}|${
            squares[1].value?.symbol || squares[1].index
        }|${squares[2].value?.symbol || squares[2].index}|
*     |${squares[3].value?.symbol || squares[3].index}|${
            squares[4].value?.symbol || squares[4].index
        }|${squares[5].value?.symbol || squares[5].index}|
*     |${squares[6].value?.symbol || squares[6].index}|${
            squares[7].value?.symbol || squares[7].index
        }|${squares[8].value?.symbol || squares[8].index}|`);
    }

    private displayCurrentPlayer() {
        console.log(`* CURRENT PLAYER: ${this.currentPlayer.symbol}`);
    }

    private changePlayer() {
        this.currentPlayer =
            this.currentPlayer == this.player1 ? this.player2 : this.player1;
    }

    async run() {
        while (!this.board.isGameOver()) {
            console.log("\n-------------------");
            this.changePlayer();
            this.displayCurrentPlayer();
            this.displayBoard();
            console.log("-------------------");

            const choice = await this.currentPlayer.getChoice(this.board);

            if (this.currentPlayer.isBot) {
                console.log(`* BOT CHOSE: ${choice}`);
                await sleep(1000);
            }
            console.log("-------------------\n");

            this.board.markSquare(choice, this.currentPlayer);

            this._history.pushHistoryItem({
                player: this.currentPlayer,
                board: this.board.clone(),
            });
        }

        console.log("\n-------------------");

        if (this.board.isBoardFull() && !this.board.isGameWon()) {
            console.log("* GAME TIED");
            this.displayBoard();
            console.log("-------------------\n");

            return {
                winner: null,
                isGameTied: true,
            };
        }

        console.log(`* PLAYER ${this.currentPlayer.symbol} WON!`);
        this.displayBoard();
        console.log("-------------------\n");

        return {
            winner: this.currentPlayer,
            isGameTied: false,
        };
    }

    public get history() {
        return this._history;
    }
}
