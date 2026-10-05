import { GameLogic } from "./GameLogic.js";
import { Generate } from "./Generate.js";
import { HtmlNode } from "./HtmlNode.js";
import { Modal } from "./Modal.js";

export class WinModal extends Modal {
  static ModalBodyComponent() {
    const GAME_LOGIC = GameLogic.getGame();
    const SCORE = GAME_LOGIC.score;

    return HtmlNode.render(
      "div",
      [
        `Все пары найдены. Количество совершённых ходов: ${SCORE}`,
        this.ModalButtonComponent(),
        this.ModalButtonStartBattleComponent(),
      ],
      {
        className: "modal__body",
      },
    );
  }

  static closeModalAndStartGame() {
    this.closeModal();
    Generate.render();
  }

  static ModalButtonStartBattleComponent() {
    return HtmlNode.render(
      "div",
      [
        HtmlNode.render("button", ["Новая игра"], {
          className: "btn btn-info",
          onclick: () => this.closeModalAndStartGame(),
        }),
        HtmlNode.render("button", ["Закрыть"], {
          className: "btn btn-danger",
          onclick: () => this.closeModal(),
        }),
      ],
      {
        className: "modal__footer_win",
      },
    );
  }
}
