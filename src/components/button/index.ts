export class Button extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    const shadow = this.attachShadow({ mode: "open" });

    const button = document.createElement("button");
    button.className = "button";

    const style = document.createElement("style");
    style.innerHTML = `
            .button{
                min-width: 200px;
                margin: 12px 0px;
                font-size: 15px;
                text-align: center;
                font-family: 'Anton', sans-serif;
                border-radius: 5px;
                height: 40px;
                border: 0;
            }
            @media (min-width: 899px){
               
              }
        `;

    button.textContent = this.textContent;

    shadow.appendChild(button);
    shadow.appendChild(style);
  }
}
customElements.define("my-button", Button);