class Header {
  static HeaderComponent() {
    const DIV = document.createElement("div");
    DIV.append(this.NewGameButtonComponent());
    DIV.append(this.Top10Button());
    return DIV;
  }

  static NewGameButtonComponent() {
    const BUTTON = document.createElement("button");
    BUTTON.textContent = "New game";
    BUTTON.setAttribute("onclick", `${Generate.name}.render()`);
    return BUTTON;
  }

  static Top10Button() {
    const BUTTON = document.createElement("button");
    BUTTON.textContent = "Top 10";
    BUTTON.setAttribute("onclick", `${TopModal.name}.openModal()`);
    return BUTTON;
  }
}
