class TopModal {
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
    const ID_MODAL = this.getIdModal();
    const SELECTOR = `#${ID_MODAL}`;
    const DIALOG = document.createElement("dialog");
    DIALOG.setAttribute("id", ID_MODAL);
    DIALOG.classList.add("modal");
    DIALOG.appendChild(this.ModalOverlayComponent());
    DIALOG.appendChild(this.ModalWrapperComponent());
    return DIALOG;
  }

  static ModalOverlayComponent() {
    const OVERLAY = document.createElement("div");
    OVERLAY.classList.add("modal__overlay");
    OVERLAY.setAttribute("onclick", `${this.name}.closeModal()`);
    return OVERLAY;
  }

  static ModalWrapperComponent() {
    const WRAPPER = document.createElement("div");
    WRAPPER.classList.add("modal__wrapper");
    WRAPPER.appendChild(this.ModalBodyComponent());
    return WRAPPER;
  }

  static ModalBodyComponent() {
    const BODY = document.createElement("div");
    BODY.classList.add("modal__body");
    BODY.textContent = "TOP 10";
    BODY.appendChild(this.getContent());
    BODY.appendChild(this.ModalButtonComponent());
    return BODY;
  }

  static ModalButtonComponent() {
    const BUTTON = document.createElement("button");
    BUTTON.classList.add("modal__close_button");
    BUTTON.setAttribute("onclick", `${this.name}.closeModal()`);
    BUTTON.textContent = "X";
    return BUTTON;
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
        DIV.textContent =
          "The game has never been played. The top 10 list is empty.";
        return DIV;
      }

      const SET_SCORE = new Set();

      for (let i = 0; i < ARRAY.length; i++) {
        SET_SCORE.add(ARRAY[i].score);
      }

      const SCORE_ARRAY = Array.from(SET_SCORE)
        .sort((a, b) => a - b)
        .slice(0, 10);

      const TABLE = document.createElement("table");

      const TR = document.createElement("tr");

      const TD1 = document.createElement("td");
      TD1.textContent = "#";

      const TD2 = document.createElement("td");
      TD2.textContent = "Score";

      const TD3 = document.createElement("td");
      TD3.textContent = "Date";

      TR.appendChild(TD1);
      TR.appendChild(TD2);
      TR.appendChild(TD3);
      TABLE.appendChild(TR);

      for (let i = 0; i < SCORE_ARRAY.length; i++) {
        const SCORE = SCORE_ARRAY[i];

        const TR_I = document.createElement("tr");

        const TD_I1 = document.createElement("td");
        TD_I1.textContent = i + 1;

        const TD_I2 = document.createElement("td");
        TD_I2.textContent = SCORE;

        const DATETIME = ARRAY.filter((e) => e.score === SCORE).sort(
          (a, b) => a.createAt - b.createAt,
        )[0].createdAt;
        const TD_I3 = document.createElement("td");
        TD_I3.textContent = this.getDate(DATETIME);

        TR_I.append(TD_I1);
        TR_I.append(TD_I2);
        TR_I.append(TD_I3);
        TABLE.append(TR_I);
      }
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
