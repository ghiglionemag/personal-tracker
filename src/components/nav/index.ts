import { initToDoPage } from "../../pages/to-do";
import { initRouter } from "../../router";

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
        
    <button class="button-to-do"> Pendientes </button>
    <button class="button-done"> Realizados </button>


        `;

    div.classList.add("nav");

    const buttonToDo = div.querySelector(".button-to-do");
    buttonToDo.addEventListener("click", (e) => {
      console.log(location.pathname);
    });

    const buttonDone = div.querySelector(".button-done");
    buttonDone.addEventListener("click", (e) => {
      console.log(location.pathname);
    });

    shadow.appendChild(div);
    shadow.appendChild(style);
  }
}
customElements.define("nav-comp", NavComponent);
