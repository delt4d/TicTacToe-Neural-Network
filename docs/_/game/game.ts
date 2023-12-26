import { Board } from "../board/board";
import { Player } from "../player/player";
import { GameHistory } from "../board/history";

export interface GameResult {
    winner: Player | null;
    isGameTied: boolean;
}

export interface Game {
    run(): Promise<GameResult>;
    board: Board;
    history: GameHistory;
    player1: Player;
    player2: Player;
}
