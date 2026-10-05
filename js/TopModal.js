import { Generate } from "./Generate.js";
import { HtmlNode } from "./HtmlNode.js";

export class TopModal {
  static localStorageKey = "_gameTop";

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
    return HtmlNode.render(
      "div",
      ["TOP 10", this.getContent(), this.ModalButtonComponent()],
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

  static closeModalAndStartBattle() {
    this.closeModal();
    Generate.render();
  }

  static getTop10() {
    const STR = localStorage.getItem(this.localStorageKey);
    if (!STR) {
      localStorage.setItem(this.localStorageKey, "[]");
      return [];
    }

    const ARRAY = JSON.parse(STR);
    if (!Array.isArray(ARRAY)) {
      localStorage.setItem(this.localStorageKey, "[]");
      return [];
    }

    return ARRAY;
  }

  static addTop10(score) {
    const ARRAY = this.getTop10();
    ARRAY.push({
      score: score,
      createdAt: new Date().getTime(),
    });
    localStorage.setItem(this.localStorageKey, JSON.stringify(ARRAY));
  }

  static getContent() {
    const DIV = document.createElement("div");
    try {
      DIV.classList.add("top10__wrapper");
      const ARRAY = this.getTop10();

      if (ARRAY.length == 0) {
        return HtmlNode.render(
          "div",
          ["The game has never been played. The top 10 list is empty."],
          {},
        );
      }

      const SET_SCORE = new Set();

      for (let i = 0; i < ARRAY.length; i++) {
        SET_SCORE.add(ARRAY[i].score);
      }

      const SCORE_ARRAY = Array.from(SET_SCORE)
        .sort((a, b) => a - b)
        .slice(0, 10);

      const TABLE = HtmlNode.render(
        "table",
        [
          HtmlNode.render(
            "tr",
            [
              HtmlNode.render("td", ["#"], {}),
              HtmlNode.render("td", ["Score"], {}),
              HtmlNode.render("td", ["Date"], {}),
            ],
            {},
          ),
          ...SCORE_ARRAY.map((score, index) => {
            const NUMBER = index + 1;
            const SCORE = score;
            const DATE = this.getDate(
              ARRAY.filter((e) => e.score === SCORE).sort(
                (a, b) => a.createAt - b.createAt,
              )[0].createdAt,
            );
            return HtmlNode.render(
              "tr",
              [
                HtmlNode.render("td", [NUMBER], {}),
                HtmlNode.render("td", [SCORE], {}),
                HtmlNode.render("td", [DATE], {}),
              ],
              {},
            );
          }),
        ],
        {},
      );

      DIV.append(TABLE);
    } catch (exception) {
      console.info(exception);
      DIV.textContent = `${exception}`;
    }
    return DIV;
  }

  static getDate(datetime) {
    const D = new Date(datetime);

    const YYYY = D.getFullYear();
    const MM = String(D.getMonth() + 1).padStart(2, "0");
    const DD = String(D.getDate()).padStart(2, "0");

    return `${DD}.${MM}.${YYYY}`;
  }
}
