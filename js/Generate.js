import { GameLogic } from "./GameLogic.js";
import { Header } from "./Header.js";
import { CounterHelper } from "./CounterHelper.js";

export class Generate {
  static render() {
    document.body.querySelectorAll("#root").forEach((e) => e.remove());

    const DIV = document.createElement("div");
    DIV.setAttribute("id", "root");
    document.body.appendChild(DIV);

    const CARDS = document.createElement("div");
    CARDS.classList.add("cards");
    CARDS.setAttribute("id", "game_board");

    GameLogic.startGame();
    const GAME_LOGIC = GameLogic.getGame();
    const ARRAY = GAME_LOGIC.array;

    for (let i = 0; i < ARRAY.length; i++) {
      const CARD = ARRAY[i];
      const ELEMENT = this.createCard({ id: CARD.id, cardId: CARD.cardId });
      CARDS.appendChild(ELEMENT);
    }

    DIV.append(Header.HeaderComponent());
    DIV.append(CounterHelper.GetGameCountComponent());
    DIV.append(CARDS);
  }

  static createCard(data) {
    const CARD = document.createElement("button");
    CARD.classList.add("card");
    CARD.addEventListener("click", () => GameLogic.setOpen(`${data.id}`));
    CARD.setAttribute("data-id", `${data.id}`);
    CARD.setAttribute("data-card-id", `${data.cardId}`);
    CARD.setAttribute("data-is-rotate", "false");

    const FRONT_DIV = document.createElement("div");
    FRONT_DIV.classList.add("card__front");
    FRONT_DIV.textContent = `FRONT ${data.id}-${data.cardId}`;

    const BACK_DIV = document.createElement("div");
    BACK_DIV.classList.add("card__back");
    BACK_DIV.textContent = "BACK";

    CARD.appendChild(FRONT_DIV);
    CARD.appendChild(BACK_DIV);

    return CARD;
  }
}
