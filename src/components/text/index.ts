export class Text extends HTMLElement {
  shadow: ShadowRoot;
  tagName: string;
  tags: string[] = ["h1", "h2", "p"];
  tag: string = "p";
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    if (this.tags.includes(this.getAttribute("tag"))) {
      this.tag = this.getAttribute("tag") || this.tag;
    }
    this.render();
  }
  render() {
    const style = document.createElement("style");
    style.innerHTML = `
    h1{
        font-size: 25pxpx;
        font-weight: bold;
        background-color: blue;
        max-width: 98%;
      }
      h2{
        font-size: 25px;
        font-weight: bold;
        height: 35px;
      }
      h2:hover{
          background-color: #fff;
      }
      p{
        font-size: 18px;
        
        color: #00d1b2;
      }
      h1,
      h2{
        font-family: 'Fira Sans', sans-serif;
        background-color: rgba(255, 255, 255, 0.5);
        color: #000;
        border-radius: 10px;
        text-align: center;
      }
      `;
    const rootEl = document.createElement(this.tag);
    rootEl.textContent = this.textContent;
    this.shadow.appendChild(style);
    this.shadow.appendChild(rootEl);
  }
}
customElements.define("my-text", Text);
