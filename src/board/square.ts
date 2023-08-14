import { Player } from '../player/player';

export class Square {
    private _value: Player | null;
    private _index: number;

    constructor(index: number, player?: Player) {
        this._value = player ?? null;
        this._index = index;
    }

    get value() {
        return this._value;
    }

    get index() {
        return this._index;
    }

    isNull() {
        return this._value === null;
    }
}