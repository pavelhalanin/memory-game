import { GameLogic } from "./GameLogic.js";
import { Header } from "./Header.js";
import { CounterHelper } from "./CounterHelper.js";
import { HtmlNode } from "./HtmlNode.js";

export class Generate {
  static render() {
    document.body.querySelectorAll("#root").forEach((e) => e.remove());

    const DIV = document.createElement("div");
    DIV.setAttribute("id", "root");
    document.body.appendChild(DIV);

    GameLogic.startGame();
    const GAME_LOGIC = GameLogic.getGame();
    const ARRAY = GAME_LOGIC.array;

    const CARDS = HtmlNode.render(
      "div",
      [
        ...ARRAY.map((CARD) => {
          return this.createCard({ id: CARD.id, cardId: CARD.cardId });
        }),
      ],
      {
        className: "cards",
        attrs: {
          id: "game_board",
        },
      },
    );

    DIV.append(Header.HeaderComponent());
    DIV.append(CounterHelper.GetGameCountComponent());
    DIV.append(CARDS);
  }

  static createCard(data) {
    return HtmlNode.render(
      "button",
      [
        HtmlNode.render("div", [`FRONT ${data.id}-${data.cardId}`], {
          className: "card__front",
        }),
        HtmlNode.render("div", [`BACK`], {
          className: "card__back",
        }),
      ],
      {
        className: "card",
        onclick: () => GameLogic.setOpen(`${data.id}`),
        attrs: {
          "data-id": `${data.id}`,
          "data-card-id": `${data.cardId}`,
          "data-is-rotate": "false",
        },
      },
    );

    return CARD;
  }
}
