import promptSync from 'prompt-sync';
import brain from 'brain.js';
import { Board } from './board.mjs';
import { sleep } from './utils.mjs';

const prompt = promptSync({ sigint: true });

export class Player {
    /** @type {string} */
    #symbol;

    /**
     *
     * @param {string} symbol
     */
    constructor(symbol) {
        if (this.constructor === Player) {
            throw new Error("Can't instantiate abstract class!");
        }

        this.#symbol = symbol;
    }

    get symbol() {
        return this.#symbol;
    }

    /**
     *
     * @param {Board} board
     * @returns {Promise<number|null>}
     */
    async getMove(board) {
        throw new Error('getMove method must be implemented by subclasses');
    }
}

export class HumanPlayer extends Player {
    /**
     *
     * @param {string} symbol
     */
    constructor(symbol) {
        super(symbol);
    }

    /**
     *
     * @param {Board} board
     * @returns {Promise<number>}
     */
    async getMove(board) {
        const emptyCells = board.getEmptyCells();

        while (true) {
            const move = parseInt(prompt(`Your turn (Player ${this.symbol}): `));

            if (!isNaN(move) && emptyCells.includes(move)) {
                console.log('\n');
                return move;
            }

            console.log('Invalid move. Try again.');
        }
    }
}

export class RandomBotPlayer extends Player {
    /**
     *
     * @param {string} symbol
     */
    constructor(symbol) {
        super(symbol);
    }

    /**
     *
     * @param {Board} board
     * @returns {Promise<number>}
     */
    async getMove(board) {
        const emptyCells = board.getEmptyCells();
        const choice = Math.floor(Math.random() * emptyCells.length);

        await sleep(Math.random() * (2000 - 500) + 500);

        return board.getEmptyCells()[choice];
    }
}

export class IABotPlayer extends Player {
    /**
     *
     * @param {string} symbol
     * @param {brain.NeuralNetwork} neuralNetwork
     */
    constructor(symbol, neuralNetwork) {
        super(symbol);
        this.neuralNetwork = neuralNetwork;
    }

    /**
     *
     * @param {Board} board
     * @returns {Promise<number>}
     */
    async getMove(board) {
        const emptyCells = board.getEmptyCells();
        const currentState = board.getPlacesNet();
        const actionValues = this.neuralNetwork.run(currentState);
        const bestActionIndex = actionValues.indexOf(Math.max(...actionValues));

        return emptyCells[bestActionIndex];
    }
}
