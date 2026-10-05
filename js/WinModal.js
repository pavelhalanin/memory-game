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
        `You are win with score ${SCORE}`,
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
        HtmlNode.render("button", ["New game"], {
          onclick: () => this.closeModalAndStartGame(),
        }),
      ],
      {},
    );
  }
}
