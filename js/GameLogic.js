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
      opened: [],
      foundCards: {},
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

  static setOpen(id) {
    const GAME_LOGIC = this.getGame();
    let openedCards = GAME_LOGIC.opened;
    const GAME_ARRAY = GAME_LOGIC.array;

    openedCards = openedCards.slice(0, 2);

    if (openedCards.filter((e) => e == id).length > 0) {
      openedCards = openedCards.filter((e) => e !== id);
    } else {
      openedCards.push(id);
    }

    openedCards = openedCards.slice(-2);

    for (let i = 0; i < GAME_ARRAY.length; i++) {
      const ID_I = `${GAME_ARRAY[i].id}`;
      GAME_ARRAY[i].isOpen = "false";
    }

    if (openedCards[0]) {
      for (let i = 0; i < GAME_ARRAY.length; i++) {
        const ID_I = `${GAME_ARRAY[i].id}`;
        if (ID_I === openedCards[0]) {
          GAME_ARRAY[i].isOpen = "true";
          break;
        }
      }
    }

    if (openedCards[1]) {
      for (let i = 0; i < GAME_ARRAY.length; i++) {
        const ID_I = `${GAME_ARRAY[i].id}`;
        if (ID_I === openedCards[1]) {
          GAME_ARRAY[i].isOpen = "true";
          break;
        }
      }
    }

    if (openedCards[0] && openedCards[1]) {
      const CARD1 = GAME_ARRAY.find((e) => e.id == openedCards[0]);
      const CARD2 = GAME_ARRAY.find((e) => e.id == openedCards[1]);
      const IS_EQUALS = CARD1.cardId === CARD2.cardId;
      if (IS_EQUALS) {
        GAME_LOGIC.foundCards[CARD1.cardId] = 1;
      }
    }

    const FOUND_CARDS = Object.keys(GAME_LOGIC.foundCards);
    for (let i = 0; i < GAME_ARRAY.length; i++) {
      const CARD_ID = `${GAME_ARRAY[i].cardId}`;

      if (FOUND_CARDS.includes(CARD_ID)) {
        GAME_ARRAY[i].isOpen = "true";
      }
    }

    GAME_LOGIC.array = GAME_ARRAY;
    GAME_LOGIC.opened = openedCards;

    localStorage.setItem(this.localStorageKey, JSON.stringify(GAME_LOGIC));
    this.updateGameHtml();
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
}
