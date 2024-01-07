import { Player } from "./interfaces";

export class Square {
    constructor(private _index: number, private _value: Player | null) {}

    get index() {
        return this._index;
    }

    get value() {
        return this._value;
    }

    get isNull() {
        return this._value === null;
    }

    update(square: Square) {
        this._index = square.index;
        this._value = square.value;
    }
}
