import { GameLogic } from "./GameLogic.js";

export class CounterHelper {
  static id_game_counter = "game_counter";

  static render() {
    const GAME_LOGIC = GameLogic.getGame();
    const SCORE = GAME_LOGIC.score;
    const PAIRS = Object.keys(GAME_LOGIC.foundCards).length;
    this.updateScore(PAIRS, SCORE);
  }

  static updateScore(pairs, score) {
    const SELECTOR = `#${this.id_game_counter}`;
    const DIV = document.querySelector(SELECTOR);
    if (!DIV) {
      console.info(`Node is not found: ${SELECTOR}`);
      return;
    }

    DIV.textContent = this.getText(pairs, score);
  }

  static GetGameCountComponent() {
    const DIV = document.createElement("div");
    DIV.setAttribute("id", this.id_game_counter);
    DIV.textContent = this.getText(0, 0);
    DIV.style.textAlign = "center";
    return DIV;
  }

  static getText(pairs, score) {
    return `Pairs guessed: ${pairs} / Score ${score}`;
  }
}
