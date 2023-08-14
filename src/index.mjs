import { Board } from './board.mjs';
import { HumanPlayer, Player, RandomBotPlayer } from './player.mjs';
import { sleep } from './utils.mjs';

console.clear();

/**
 *
 * @param {Board} board
 */
function displayBoard(board) {
    const places = board.getPlaces();

    console.log(`
    |${places[0]}|${places[1]}|${places[2]}|
    |${places[3]}|${places[4]}|${places[5]}|
    |${places[6]}|${places[7]}|${places[8]}|
    `);
}

/**
 *
 * @param {Player} currentPlayer
 */
function showCurrentPlayer(currentPlayer) {
    console.log(`CURRENT PLAYER: ${currentPlayer.symbol}`);
}

(async () => {
    const board = new Board();

    const player1 = new HumanPlayer('X');
    const player2 = new RandomBotPlayer('O');

    /** @type { Player } */
    let currentPlayer = player1;

    while (!board.gameIsOver) {
        showCurrentPlayer(currentPlayer);
        displayBoard(board);

        const move = await currentPlayer.getMove(board);

        if (currentPlayer instanceof RandomBotPlayer) {
            console.log(`Bot chose: ${move}`);
            await sleep(1000);
            console.log();
        }

        board.makeMove(currentPlayer, move);

        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    displayBoard(board);

    if (board.isBoardFull()) {
        console.log('\nGame tied');
        return;
    }

    console.log(`\nPlayer ${currentPlayer.symbol} won`);
})();
