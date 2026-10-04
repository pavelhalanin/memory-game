class Generate {
  static render() {
    const SELECTOR = "#root";
    const DIV = document.querySelector(SELECTOR);
    if (!DIV) {
      console.info(`Node is not found: ${SELECTOR}`);
      return;
    }

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

    DIV.append(CARDS);
  }

  static createCard(data) {
    const CARD = document.createElement("button");
    CARD.classList.add("card");
    CARD.setAttribute("onclick", `GameLogic.setOpen('${data.id}')`);
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
