customElements.define(
  "to-do-item",
  class extends HTMLElement {
    shadow: ShadowRoot;
    title: string;
    checked: boolean = false;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this.title = this.getAttribute("title") || "";
      this.checked = this.hasAttribute("checked");
      this.id = this.getAttribute("id");

      const style = document.createElement("style");
      style.innerText = `
       
        .item{
            display: flex;
            justify-content: space-between;
            padding: 22px 13px;
            font-size: 18px;
            background-color: rgba(255, 255, 255, 0.5);
            color: #000;
            border-radius: 10px;
        }

        .titulo.checked{
            text-decoration: line-through;
        }
        .checkbox-input {
          margin-top: 15px;
          height: 20px;
          width: 20px;
        }
        `;

      this.shadow.appendChild(style);
      this.render();
    }

    addListeners() {
      const checkedElement = this.shadow.querySelector(".checkbox-input");
      checkedElement.addEventListener("click", (e) => {
        const target = e.target as any;
        const event = new CustomEvent("change", {
          detail: {
            id: this.id,
            value: target.checked,
          },
        });
        this.dispatchEvent(event);
      });
    }

    render() {
      const div = document.createElement("div");
      div.innerHTML = `
      <my-text tag="p" class="titulo ${this.checked ? "checked" : ""}"> ${
        this.title
      } </my-text>
      <input class="checkbox-input" type="checkbox"
      ${this.checked ? "checked" : ""}
      />
      `;

      div.classList.add("item");

      this.shadow.appendChild(div);
      this.addListeners();
    }
  }
);
