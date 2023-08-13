import { Board } from './board.mjs';
import { BotPlayer, HumanPlayer, Player } from './player.mjs';
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
    /** @type { Player } */
    let currentPlayer;

    const board = new Board();
    const player1 = new BotPlayer('X');
    const player2 = new BotPlayer('O');

    let oddTurn = false;

    while (!board.gameIsOver) {
        currentPlayer = oddTurn ? player2 : player1;
        
        showCurrentPlayer(currentPlayer);
        displayBoard(board);

        const move = await currentPlayer.getMove(board);

        if (currentPlayer instanceof BotPlayer) {
            console.log(`Bot chose: ${move}`);
            await sleep(1000);
            console.log();
        }

        board.makeMove(currentPlayer, move);
        oddTurn = !oddTurn;
    }

    displayBoard(board);

    if (board.isBoardFull()) {
        console.log("\nGame tied");
        return;
    }

    console.log(`\nPlayer ${currentPlayer.symbol} won`);
})();