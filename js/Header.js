import { Generate } from "./Generate.js";
import { TopModal } from "./TopModal.js";
import { HtmlNode } from "./HtmlNode.js";

export class Header {
  static HeaderComponent() {
    return HtmlNode.render("div", [
      this.NewGameButtonComponent(),
      this.Top10Button(),
    ]);
  }

  static NewGameButtonComponent() {
    return HtmlNode.render("button", ["New game"], {
      onclick: () => Generate.render(),
    });
  }

  static Top10Button() {
    return HtmlNode.render("button", ["Top 10"], {
      onclick: () => TopModal.openModal(),
    });
  }
}
