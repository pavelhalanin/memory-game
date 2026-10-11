import { Generate } from "./Generate.js";
import { TopModal } from "./TopModal.js";
import { HtmlNode } from "./HtmlNode.js";

export class Header {
  static HeaderComponent() {
    return HtmlNode.render(
      "header",
      [this.NewGameButtonComponent(), this.Top10Button()],
      {
        className: "header",
      },
    );
  }

  static NewGameButtonComponent() {
    return HtmlNode.render("button", ["Новая игра"], {
      className: "btn btn-info",
      onclick: () => Generate.render(),
    });
  }

  static Top10Button() {
    return HtmlNode.render("button", ["Таблица лидеров"], {
      className: "btn btn-info",
      onclick: () => TopModal.openModal(),
    });
  }
}
