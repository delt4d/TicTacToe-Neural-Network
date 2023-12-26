import { Player } from "../player/player";

export class Square {
    constructor(
        public readonly index: number,
        public readonly value: Player | null
    ) {}

    isNull() {
        return this.value === null;
    }
}
