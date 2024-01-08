import { Board } from "./board";

interface Item {
    readonly board: Board;
}

export class GameHistory {
    private _history: Item[] = [];

    get items(): Item[] {
        return this._history;
    }

    get size() {
        return this._history.length;
    }

    pushHistoryItem(board: Board) {
        this._history.push({ board });
    }
}
