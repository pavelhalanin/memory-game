import { Generate } from "./Generate.js";
import { HtmlNode } from "./HtmlNode.js";
import { Modal } from "./Modal.js";

export class TopModal extends Modal {
  static localStorageKey = "_gameTop";

  static ModalBodyComponent() {
    return HtmlNode.render(
      "div",
      ["TOP 10", this.getContent(), this.ModalButtonComponent()],
      {
        className: "modal__body",
      },
    );
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
