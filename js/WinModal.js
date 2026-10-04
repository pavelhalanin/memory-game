class WinModal {
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
    BODY.textContent = "You are win";
    BODY.appendChild(this.ModalButtonComponent());
    BODY.appendChild(this.ModalButtonStartBattleComponent());
    return BODY;
  }

  static ModalButtonComponent() {
    const BUTTON = document.createElement("button");
    BUTTON.classList.add("modal__close_button");
    BUTTON.setAttribute("onclick", `${this.name}.closeModal()`);
    BUTTON.textContent = "X";
    return BUTTON;
  }

  static closeModalAndStartGame() {
    this.closeModal();
    Generate.render();
  }

  static ModalButtonStartBattleComponent() {
    const DIV = document.createElement("div");

    const BUTTON = document.createElement("button");
    BUTTON.setAttribute("onclick", `${this.name}.closeModalAndStartGame()`);
    BUTTON.textContent = "New game";

    DIV.appendChild(BUTTON);

    return DIV;
  }
}
