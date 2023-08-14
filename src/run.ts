import { Game, GameResult } from './game/game';
import { saveFile } from './utils';

export interface RunResult {
    game: Game,
    result: GameResult
}

/**
 * Runs the game and saves the result to a file.
 *
 * @param {Game} game - The game object to run.
 * @return {Promise<RunResult>} A promise that resolves to an object containing the game object and the result of the game.
 */
export async function run(game: Game): Promise<RunResult> {
    const result = await game.run();
    await saveFile(__dirname + '/data/game-result.json', JSON.stringify(result));
    return { game, result }
}