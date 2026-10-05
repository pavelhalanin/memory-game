import { Generate } from "./Generate.js";
import { TopModal } from "./TopModal.js";

export class Header {
  static HeaderComponent() {
    const DIV = document.createElement("div");
    DIV.append(this.NewGameButtonComponent());
    DIV.append(this.Top10Button());
    return DIV;
  }

  static NewGameButtonComponent() {
    const BUTTON = document.createElement("button");
    BUTTON.textContent = "New game";
    BUTTON.addEventListener("click", () => Generate.render());
    return BUTTON;
  }

  static Top10Button() {
    const BUTTON = document.createElement("button");
    BUTTON.textContent = "Top 10";
    BUTTON.addEventListener("click", () => TopModal.openModal());
    return BUTTON;
  }
}
