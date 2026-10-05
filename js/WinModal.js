import { GameLogic } from "./GameLogic.js";
import { Generate } from "./Generate.js";
import { HtmlNode } from "./HtmlNode.js";

export class WinModal {
  static getIdModal() {
    return `${this.name}__modal`;
  }

  static openModal() {
    try {
      document.body.setAttribute("data-no-scroll-on-open-modal", "true");
      const DIALOG = this.ModalDialogComponent();
      document.body.appendChild(DIALOG);
      DIALOG.showModal();
    } catch (exception) {
      console.info(exception);
    }
  }

  static closeModal() {
    const ID_MODAL = this.getIdModal();

    const SELECTOR = `#${ID_MODAL}`;
    document.body.removeAttribute("data-no-scroll-on-open-modal");
    const DIALOG = document.querySelector(SELECTOR);
    if (!DIALOG) {
      console.info(`Node is not found: ${SELECTOR}`);
      return;
    }

    DIALOG.close();

    document.querySelectorAll(`#${ID_MODAL}`).forEach((e) => {
      e.remove();
    });
  }

  static ModalDialogComponent() {
    return HtmlNode.render(
      "dialog",
      [this.ModalOverlayComponent(), this.ModalWrapperComponent()],
      {
        className: "modal",
        attrs: {
          id: this.getIdModal(),
        },
      },
    );
  }

  static ModalOverlayComponent() {
    return HtmlNode.render("div", [], {
      className: "modal__overlay",
      onclick: () => this.closeModal(),
    });
  }

  static ModalWrapperComponent() {
    return HtmlNode.render("div", [this.ModalBodyComponent()], {
      className: "modal__wrapper",
    });
  }

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

  static ModalButtonComponent() {
    return HtmlNode.render("button", ["x"], {
      className: "modal__close_button",
      onclick: () => this.closeModal(),
    });
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
