import { Board } from '../board/board';
import { Square } from '../board/square';

export interface Player {
    symbol: string;
    isBot: boolean;
    getChoice(board: Board): Promise<number>;
}