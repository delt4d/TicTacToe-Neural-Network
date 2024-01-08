import { Board } from "../board";
import { Choice } from "../choice";

export interface Player {
  readonly isBot: boolean;
  getChoice(board: Board): Promise<Choice>;
}
