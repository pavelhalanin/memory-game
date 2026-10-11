export class HtmlNode {
  static render(
    tag = "span",
    children = [],
    params = {
      className: "",
      onclick: () => {},
      attrs: {},
    },
  ) {
    const TAG = document.createElement(tag);
    if (!Array.isArray(children)) {
      throw new Error("children param is not array");
    }

    for (let i = 0; i < children.length; i++) {
      TAG.append(children[i]);
    }

    if (params.className) {
      if (typeof params.className !== "string") {
        throw new Error("className param is not string");
      }

      const CLASSES = params.className.split(" ");
      for (let i = 0; i < CLASSES.length; i++) {
        TAG.classList.add(CLASSES[i]);
      }
    }

    if (params.onclick) {
      if (typeof params.onclick !== "function") {
        throw new Error("onclick param is not function");
      }
      TAG.addEventListener("click", params.onclick);
    }

    if (params.attrs) {
      if (typeof params.attrs !== "object") {
        throw new Error("attrs param is not object");
      }

      const KEYS = Object.keys(params.attrs);
      for (let i = 0; i < KEYS.length; i++) {
        const ATTR = KEYS[i];
        const VALUE = params.attrs[ATTR];
        TAG.setAttribute(ATTR, `${VALUE}`);
      }
    }

    return TAG;
  }
}
