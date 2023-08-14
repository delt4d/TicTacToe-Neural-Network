import brain from 'brain.js';
import { IABotPlayer, RandomBotPlayer, Player } from './player.mjs';
import { Board } from './board.mjs';
import { dirname, saveFile } from './utils.mjs';

class Game {
    constructor() {
        const winningCombinations = Board.winningCombinations;
        const getEmptyBoard = () => Array(9).fill(null);

        this.net = new brain.NeuralNetwork();
        this.net.train([
            // TODO: need to train neural network
        ]);
    }

    async start() {
        const bot1 = new IABotPlayer('X', this.net);
        const bot2 = new RandomBotPlayer('O');

        /** @type {Player} */
        let currentPlayer = bot1;

        const board = new Board();

        while (!board.gameIsOver) {
            const move = await currentPlayer.getMove(board);
            board.makeMove(currentPlayer, move);
            currentPlayer = currentPlayer === bot1 ? bot2 : bot1;
        }

        if (board.gameIsOver) return 0;
        if (currentPlayer === bot1) return 1;
        return -1;
    }
}

(async () => {
    const games = Array(100).fill(new Game());

    const results = await Promise.allSettled(
        games.map(async (game) => game.start())
    );

    const botResults = [];

    for (let result of results) {
        if (result.status === 'fulfilled') {
            botResults.push(result.value);
        }
    }

    const sortedBots = botResults.sort((a, b) => b - a);
    const numberOfBestBotsToKeep = 5;
    const bestBots = sortedBots.slice(0, numberOfBestBotsToKeep);

    await Promise.allSettled(
        bestBots.map(async (botIndex) => {
            const bot = games[botIndex].net.toJSON();

            return saveFile(
                dirname() + `/data/${botIndex}.txt`,
                JSON.stringify(bot)
            );
        })
    );
})();
