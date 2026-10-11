import { GameLogic } from "./GameLogic.js";
import { HtmlNode } from "./HtmlNode.js";

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

    DIV.replaceChildren();
    DIV.append(this.getText(pairs, score));
  }

  static GetGameCountComponent() {
    return HtmlNode.render("div", [this.getText(0, 0)], {
      attrs: {
        id: this.id_game_counter,
      },
    });
  }

  static getText(pairs, score) {
    return HtmlNode.render(
      "div",
      [
        HtmlNode.render("div", [`Счётчик ходов: ${score}`], {}),
        HtmlNode.render("div", [`Найдено пар: ${pairs}/8`], {}),
      ],
      {
        className: "game_status",
      },
    );
  }
}
