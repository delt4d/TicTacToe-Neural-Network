import * as brain from "brain.js";
import { saveFile } from "./utils";
import { Game } from "./game/game";
import { Board } from "./board/board";
import { Player } from "./player/player";
import { RandomBot } from "./player/random-bot";
import { NetGame } from "./game/net-game";

const match: Promise<number[][]>[] = async () => {
    const getInputOutput = (board: Board, player1: Player, winner?: Player) => {
        const isGameTied = result.isGameTied;
        const input = board.getSquaresToNetwork(player1);
        const output = isGameTied || !winner ? 0 : winner === player1 ? 1 : -1;

        return [...input, output];
    };

    const bot1 = new RandomBot("X");
    const bot2 = new RandomBot("O");
    const game = new NetGame(bot1, bot2, new Board());

    const result = await game.run();
    const history: number[][] = game.history.items.map((item) => {
        return getInputOutput(item.board, item.player);
    });

    return [...history, getInputOutput(game.board, bot1, result.winner!)];
};

const start = async () => {
    const matches = 1_000;
    const promise: Promise<number[][]>[] = [];

    for (let i = 0; i < matches; i++) promise.push(match());

    const data: number[][] = await Promise.all(promise);

    const net = new brain.NeuralNetwork<number[], number[]>({
        hiddenLayers: [9, 9],
        binaryThresh: 0.5,
        iterations: 100,
        outputSize: 9,
        activation: "sigmoid",
    });

    const prepared = data.map((set) => {
        return {
            input: set.slice(0, 9),
            output: [set[9]],
        };
    });

    net.train(prepared);

    await saveFile(__dirname + "/data/trained.txt", JSON.stringify(net.toJSON()));
};

start();
