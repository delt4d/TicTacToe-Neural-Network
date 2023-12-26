import { Player } from "../player/player";
import { Board } from "./board";

type Item = {
    board: Board;
    player: Player;
};

export class GameHistory {
    private _history: Item[] = [];

    get items(): Item[] {
        return this._history;
    }

    pushHistoryItem(historyItem: Item) {
        this._history.push(historyItem);
    }
}
