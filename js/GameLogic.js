class GameLogic {
  static localStorageKey = "game_logic";
  static cards = [
    {
      id: 1,
      imageSrc: "./assets/pokemon/1.png",
    },
    {
      id: 2,
      imageSrc: "./assets/pokemon/4.png",
    },
    {
      id: 3,
      imageSrc: "./assets/pokemon/7.png",
    },
    {
      id: 4,
      imageSrc: "./assets/pokemon/16.png",
    },
    {
      id: 5,
      imageSrc: "./assets/pokemon/25.png",
    },
    {
      id: 6,
      imageSrc: "./assets/pokemon/40.png",
    },
    {
      id: 7,
      imageSrc: "./assets/pokemon/41.png",
    },
    {
      id: 8,
      imageSrc: "./assets/pokemon/271.png",
    },
  ];

  static startGame() {
    const ARRAY = [];
    const CARDS = this.cards;

    for (let i = 0; i < CARDS.length; i++) {
      const CARD = CARDS[i];
      ARRAY.push({
        id: i * 2 + 1,
        cardId: CARD.id,
        isOpen: "false",
      });
      ARRAY.push({
        id: i * 2 + 2,
        cardId: CARD.id,
        isOpen: "false",
      });
    }

    const SHUFFLE_ARRAY = this.shuffle(ARRAY);

    const GAME_LOGIC = {
      card1: null,
      card2: null,
      foundCards: {},
      score: 0,
      isScoreNotSaved: true,
      array: SHUFFLE_ARRAY,
    };

    localStorage.setItem(this.localStorageKey, JSON.stringify(GAME_LOGIC));
  }

  static getGame() {
    return JSON.parse(localStorage.getItem(this.localStorageKey));
  }

  static shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  static async setOpen(id) {
    if (this.isWin()) {
      return;
    }

    const GAME_LOGIC = this.getGame();

    if (id === -1) {
      GAME_LOGIC.card1 = null;
      GAME_LOGIC.card2 = null;
    } else {
      if (GAME_LOGIC.card1) {
        if (GAME_LOGIC.card2) {
          return;
        } else {
          if (GAME_LOGIC.card1 !== id) {
            GAME_LOGIC.card2 = id;
          }
        }
      } else {
        GAME_LOGIC.card1 = id;
      }
    }

    if (GAME_LOGIC.card1 && GAME_LOGIC.card2) {
      GAME_LOGIC.score += 1;
    }

    for (let i = 0; i < GAME_LOGIC.array.length; i++) {
      const ID_I = `${GAME_LOGIC.array[i].id}`;
      GAME_LOGIC.array[i].isOpen = "false";
    }

    if (GAME_LOGIC.card1) {
      for (let i = 0; i < GAME_LOGIC.array.length; i++) {
        const ID_I = `${GAME_LOGIC.array[i].id}`;

        if (ID_I === GAME_LOGIC.card1) {
          GAME_LOGIC.array[i].isOpen = "true";
          break;
        }
      }
    }

    if (GAME_LOGIC.card2) {
      for (let i = 0; i < GAME_LOGIC.array.length; i++) {
        const ID_I = `${GAME_LOGIC.array[i].id}`;
        if (ID_I === GAME_LOGIC.card2) {
          GAME_LOGIC.array[i].isOpen = "true";
          break;
        }
      }
    }

    if (GAME_LOGIC.card1 && GAME_LOGIC.card2) {
      const CARD1 = GAME_LOGIC.array.find((e) => e.id == GAME_LOGIC.card1);
      const CARD2 = GAME_LOGIC.array.find((e) => e.id == GAME_LOGIC.card2);

      const IS_EQUALS = CARD1.cardId === CARD2.cardId;
      if (IS_EQUALS) {
        GAME_LOGIC.foundCards[CARD1.cardId] = 1;
        GAME_LOGIC.card1 = null;
        GAME_LOGIC.card2 = null;
      }
    }

    const FOUND_CARDS = Object.keys(GAME_LOGIC.foundCards);
    for (let i = 0; i < GAME_LOGIC.array.length; i++) {
      const CARD_ID = `${GAME_LOGIC.array[i].cardId}`;

      if (FOUND_CARDS.includes(CARD_ID)) {
        GAME_LOGIC.array[i].isOpen = "true";
      }
    }

    localStorage.setItem(this.localStorageKey, JSON.stringify(GAME_LOGIC));
    this.updateGameHtml();
    CounterHelper.render();

    if (this.isWin()) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (GAME_LOGIC.card1 && GAME_LOGIC.card2) {
      const CARD1 = GAME_LOGIC.array.find((e) => e.id == GAME_LOGIC.card1);
      const CARD2 = GAME_LOGIC.array.find((e) => e.id == GAME_LOGIC.card2);
      const NOT_EQUALS = CARD1.cardId !== CARD2.cardId;
      if (NOT_EQUALS) {
        GAME_LOGIC.card1 = null;
        GAME_LOGIC.card2 = null;
        this.setOpen(-1);
      }
    }
  }

  static updateGameHtml() {
    const SELECTOR = "#game_board";
    const GAME_BOARD = document.querySelector(SELECTOR);
    if (!GAME_BOARD) {
      console.info(`Node is not found: ${SELECTOR}`);
      return;
    }

    const CARDS = GAME_BOARD.children;
    const GAME_LOGIC = this.getGame();
    const GAME_ARRAY = GAME_LOGIC.array;

    for (let i = 0; i < CARDS.length; i++) {
      let isNotFound = true;
      for (let j = 0; j < GAME_ARRAY.length; j++) {
        const ID_I = CARDS[i].getAttribute("data-id");
        const ID_J = `${GAME_ARRAY[j].id}`;
        if (ID_I === ID_J) {
          CARDS[i].setAttribute("data-card-id", `${GAME_ARRAY[j].cardId}`);
          CARDS[i].setAttribute("data-is-rotate", `${GAME_ARRAY[j].isOpen}`);
          isNotFound = false;
        }
      }

      if (isNotFound) {
        CARDS[i].setAttribute("data-is-rotate", "false");
      }
    }
  }

  static isWin() {
    const GAME_LOGIC = this.getGame();
    const CLOSED_CARDS = GAME_LOGIC.array.filter(
      (e) => e.isOpen == "true",
    ).length;
    const COUNT_CARDS = GAME_LOGIC.array.length;
    if (CLOSED_CARDS === COUNT_CARDS) {
      WinModal.openModal();

      if (GAME_LOGIC.isScoreNotSaved) {
        GAME_LOGIC.isScoreNotSaved = false;
        localStorage.setItem(this.localStorageKey, JSON.stringify(GAME_LOGIC));
        TopModal.addTop10(GAME_LOGIC.score);
      }

      return true;
    }

    return false;
  }
}
