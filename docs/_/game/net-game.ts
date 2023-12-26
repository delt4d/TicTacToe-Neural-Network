import { Board } from "../board/board";
import { RandomBot } from "../player/random-bot";
import { Game, GameResult } from "./game";
import { GameHistory } from "../board/history";

export class NetGame implements Game {
    private _history: GameHistory;

    constructor(
        public player1: RandomBot,
        public player2: RandomBot,
        public board: Board
    ) {
        this.board = board;
        this.player1 = player1;
        this.player2 = player2;
        this._history = new GameHistory();
    }

    async run(): Promise<GameResult> {
        let currentPlayer = this.player1;

        while (!this.board.isGameOver()) {
            const move = await currentPlayer.getChoice(this.board);

            if (this.board.markSquare(move, currentPlayer)) {
                this._history.pushHistoryItem({
                    player: currentPlayer,
                    board: this.board.clone(),
                });

                currentPlayer =
                    currentPlayer === this.player1 ? this.player2 : this.player1;
            }
        }

        if (this.board.isBoardFull() && !this.board.isGameWon()) {
            return {
                isGameTied: true,
                winner: null,
            };
        }

        return {
            isGameTied: false,
            winner: currentPlayer,
        };
    }

    public get history() {
        return this._history;
    }
}
