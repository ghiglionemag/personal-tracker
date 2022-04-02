import { state } from "../../state";

export class NavComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    const shadow = this.attachShadow({ mode: "open" });

    const div = document.createElement("div");

    const style = document.createElement("style");
    style.innerText = `
       .nav{
        padding: 15px;
       }
        `;
    div.innerHTML = `
        
          <my-text tag="h2">Pendientes</my-text>
          <my-text tag="h2">Realizados</my-text>
        `;
    div.classList.add("nav");
    shadow.appendChild(div);
    shadow.appendChild(style)
  }
}
customElements.define("nav-comp", NavComponent);
