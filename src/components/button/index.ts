export class Button extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    const shadow = this.attachShadow({ mode: "open" });

    const button = document.createElement("button");
    button.className = "root";

    const style = document.createElement("style");
    style.innerHTML = `
            .root{
                min-width: 100pxpx; 
                line-height: 55px;
                margin: 12px 0px;
                border-radius: 20px;
                font-size: 22px;
                text-align: center;
                font-family: 'Anton', sans-serif;
            }
            @media (min-width: 899px){
                .root{
                  margin-left: 10px;
                  
                }
              }
        `;

    button.textContent = this.textContent;

    shadow.appendChild(button);
    shadow.appendChild(style);
  }
}
customElements.define("my-button", Button);