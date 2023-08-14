import { Board } from '../board/board';
import { Player } from '../player/player';

export interface GameResult {
    winner: Player | null;
    isGameTied: boolean;
}

export interface Game {
    run(): Promise<GameResult>;
    board: Board;
    player1: Player;
    player2: Player;
}