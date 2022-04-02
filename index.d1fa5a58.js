class t extends HTMLElement{constructor(){super(),this.tags=["h1","h2","p"],this.tag="p",this.shadow=this.attachShadow({mode:"open"}),this.tags.includes(this.getAttribute("tag"))&&(this.tag=this.getAttribute("tag")||this.tag),this.render()}render(){const t=document.createElement("style");t.innerHTML="\n    h1{\n        font-size: 52px;\n        font-weight: bold;\n        background-color: blue;\n        max-width: 98%;\n      }\n      h2{\n        font-size: 25px;\n        font-weight: bold;\n        height: 35px;\n      }\n      h2:hover{\n          background-color: #fff;\n      }\n      p{\n        font-family: \"Roboto\";\n        font-size: 18px;\n      }\n      h1,\n      h2{\n        font-family: 'Fira Sans', sans-serif;\n        background-color: rgba(255, 255, 255, 0.5);\n        color: #000;\n        border-radius: 10px;\n        text-align: center;\n        color: #000;\n        -webkit-box-shadow: -6px 8px 6px -6px black;\n        -moz-box-shadow: 0 8px 6px -6px black;\n         box-shadow: 0 8px 6px -6px black;\n      }\n      ";const e=document.createElement(this.tag);e.textContent=this.textContent,this.shadow.appendChild(t),this.shadow.appendChild(e)}}customElements.define("my-text",t);class e extends HTMLElement{constructor(){super(),this.render()}render(){const t=this.attachShadow({mode:"open"}),e=document.createElement("div"),n=document.createElement("style");n.innerText="\n       .nav{\n        padding: 15px;\n       }\n        ",e.innerHTML='\n        \n          <my-text tag="h2">Pendientes</my-text>\n          <my-text tag="h2">Realizados</my-text>\n        ',e.classList.add("nav"),t.appendChild(e),t.appendChild(n)}}customElements.define("nav-comp",e),customElements.define("to-do-item",class extends HTMLElement{constructor(){super(),this.checked=!1,this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.title=this.getAttribute("title")||"",this.checked=this.hasAttribute("checked"),this.id=this.getAttribute("id");const t=document.createElement("style");t.innerText="\n       \n        .root{\n            border-radius: 2px;\n            padding: 22px 13px;\n            font-size: 18px;\n            background-color: rgba(255, 255, 255, 0.5);\n            color: #000;\n            border-radius: 10px;\n            color: #000;\n            -webkit-box-shadow: 0 8px 6px -6px black;\n            -moz-box-shadow: 0 8px 6px -6px black;\n            box-shadow: 0 8px 6px -6px black;\n        }\n\n        .titulo.checked{\n            text-decoration: line-through;\n        }\n        ",this.shadow.appendChild(t),this.render()}addListeners(){this.shadow.querySelector(".checkbox-input").addEventListener("click",(t=>{const e=t.target,n=new CustomEvent("change",{detail:{id:this.id,value:e.checked}});this.dispatchEvent(n)}))}render(){const t=document.createElement("div");t.innerHTML=`\n      <my-text tag="p" class="titulo ${this.checked?"checked":""}"> ${this.title} </my-text>\n      <input class="checkbox-input" type="checkbox"\n      ${this.checked?"checked":""}\n      />\n      `,t.classList.add("root"),this.shadow.appendChild(t),this.addListeners()}});const n={data:{tasks:[{id:1,title:"primer item",completed:!1},{id:2,title:"segundo item",completed:!1},{id:3,title:"tercer item",deleted:!0}]},listeners:[],initState(){const t=localStorage.getItem("saved-state");this.setState(JSON.parse(t))},getState(){return this.data},getEnabledTasks(){return this.getState().tasks.filter((t=>!t.deleted))},addTask(t,e){const n=this.getState();n.tasks.push({id:t,title:e,completed:!1}),this.setState(n)},changeItemState(t,e){const n=this.getState();n.tasks.find((e=>e.id==t)).completed=e,this.setState(n)},setState(t){this.data=t;for(const t of this.listeners)t();localStorage.setItem("saved-state",JSON.stringify(t))},suscribe(t){this.listeners.push(t)}};!function(t){const e=document.createElement("div"),s=n.getEnabledTasks();e.innerHTML=' \n  <div class="header">\n  <my-text tag="h1"> Mis pendientes </my-text> \n  <input class="inputEl" type="text" placeholder="Nuevo pendiente">\n  <button class="add-button">Agregar</button>\n  </div>\n  <ul class="lista"></ul> \n\n  \n  ';const i=e.querySelector(".lista");function a(t){i.innerHTML="";for(const e of t){const t=document.createElement("to-do-item");t.setAttribute("id",e.id),t.setAttribute("title",e.title),e.completed&&t.setAttribute("checked","true"),t.addEventListener("change",(t=>{n.changeItemState(t.detail.id,t.detail.value)})),i.appendChild(t)}}n.suscribe((()=>{a(n.getEnabledTasks())})),a(s),e.classList.add("to-do");const d=document.createElement("style");d.innerText="\n       .root{\n        height: 100%;\n       .to-do{\n        height: 100%\n        display: grid;\n        grid-template-rows: 20% 60%;\n       }\n        ",e.querySelector(".add-button").addEventListener("click",(()=>{let t=document.querySelector("input").value;n.addTask(Math.random(),t)})),t.appendChild(e),t.appendChild(d)}(document.querySelector(".root"));
//# sourceMappingURL=index.d1fa5a58.js.map
