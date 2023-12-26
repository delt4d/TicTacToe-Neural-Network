import { Board } from "../board/board";

export interface Player {
    symbol: string;
    isBot: boolean;
    getChoice(board: Board): Promise<number>;
}
