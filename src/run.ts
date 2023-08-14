import { Game, GameResult } from './game/game';

export interface RunResult {
    game: Game,
    result: GameResult
}

export async function run(game: Game) {
    const result = await game.run();
    return { game, result }
}