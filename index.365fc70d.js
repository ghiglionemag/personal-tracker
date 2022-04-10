class t extends HTMLElement{constructor(){super(),this.tags=["h1","h2","p"],this.tag="p",this.shadow=this.attachShadow({mode:"open"}),this.tags.includes(this.getAttribute("tag"))&&(this.tag=this.getAttribute("tag")||this.tag),this.render()}render(){const t=document.createElement("style");t.innerHTML="\n    h1{\n        font-size: 52px;\n        font-weight: bold;\n        background-color: blue;\n        max-width: 98%;\n      }\n      h2{\n        font-size: 25px;\n        font-weight: bold;\n        height: 35px;\n      }\n      h2:hover{\n          background-color: #fff;\n      }\n      p{\n        font-family: \"Roboto\";\n        font-size: 18px;\n      }\n      h1,\n      h2{\n        font-family: 'Fira Sans', sans-serif;\n        background-color: rgba(255, 255, 255, 0.5);\n        color: #000;\n        border-radius: 10px;\n        text-align: center;\n      }\n      ";const e=document.createElement(this.tag);e.textContent=this.textContent,this.shadow.appendChild(t),this.shadow.appendChild(e)}}customElements.define("my-text",t);class e extends HTMLElement{constructor(){super(),this.render()}render(){const t=this.attachShadow({mode:"open"}),e=document.createElement("button");e.className="root";const n=document.createElement("style");n.innerHTML="\n            .root{\n                min-width: 322px; \n                line-height: 55px;\n                margin: 12px 0px;\n                border-radius: 20px;\n                font-size: 22px;\n                text-align: center;\n                font-family: 'Anton', sans-serif;\n            }\n            @media (min-width: 899px){\n                .root{\n                  margin-left: 10px;\n                  \n                }\n              }\n        ",e.textContent=this.textContent,t.appendChild(e),t.appendChild(n)}}customElements.define("my-button",e),customElements.define("to-do-item",class extends HTMLElement{constructor(){super(),this.checked=!1,this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.title=this.getAttribute("title")||"",this.checked=this.hasAttribute("checked"),this.id=this.getAttribute("id");const t=document.createElement("style");t.innerText="\n       \n        .item{\n            display: flex;\n            justify-content: space-between;\n            padding: 22px 13px;\n            font-size: 18px;\n            background-color: rgba(255, 255, 255, 0.5);\n            color: #000;\n            border-radius: 10px;\n        }\n\n        .titulo.checked{\n            text-decoration: line-through;\n        }\n        .checkbox-input {\n          margin-top: 15px;\n          height: 20px;\n          width: 20px;\n        }\n        ",this.shadow.appendChild(t),this.render()}addListeners(){this.shadow.querySelector(".checkbox-input").addEventListener("click",(t=>{const e=t.target,n=new CustomEvent("change",{detail:{id:this.id,value:e.checked,deleted:!0}});this.dispatchEvent(n)}))}render(){const t=document.createElement("div");t.innerHTML=`\n      <my-text tag="p" class="titulo ${this.checked?"checked":""}"> ${this.title} </my-text>\n      <input class="checkbox-input" type="checkbox"\n      ${this.checked?"checked":""}\n      />\n      `,t.classList.add("item"),this.shadow.appendChild(t),this.addListeners()}});const n={data:{tasks:[{id:1,title:"primer item",completed:!1},{id:2,title:"segundo item",completed:!1},{id:3,title:"tercer item",deleted:!0}]},listeners:[],initState(){const t=localStorage.getItem("saved-state");this.setState(JSON.parse(t))},getState(){return this.data},getEnabledTasks(){return this.getState().tasks.filter((t=>0==t.completed))},getDisabledTasks(){return this.getState().tasks.filter((t=>0==!t.completed))},addTask(t,e){const n=this.getState();n.tasks.push({id:t,title:e,completed:!1}),this.setState(n)},changeItemState(t,e){const n=this.getState(),o=n.tasks.find((e=>e.id==t));o.completed=e,console.log(o),this.setState(n)},setState(t){this.data=t;for(const t of this.listeners)t();localStorage.setItem("saved-state",JSON.stringify(t))},suscribe(t){this.listeners.push(t)}};function o(t){const e=document.querySelector(".root"),o=n.getEnabledTasks();e.innerHTML='\n  <my-button class="button-todo">Pendientes</my-button>\n  <my-button class="button-done">Realizados</my-button> \n  <div class="header">\n  <my-text tag="h1"> Mis pendientes </my-text> \n  <input class="inputEl" type="text" placeholder="Nuevo pendiente">\n  <button class="add-button">Agregar</button>\n  </div>\n  <ul class="lista"></ul> \n  <div class="pagenumbers" id="pagination"></div>\n  \n  ';const i=e.querySelector(".lista");function s(t){i.innerHTML="";for(const e of t){const t=document.createElement("to-do-item");t.setAttribute("id",e.id),t.setAttribute("title",e.title),e.completed&&t.setAttribute("checked","true"),t.addEventListener("change",(t=>{console.log(t),n.changeItemState(t.detail.id,t.detail.value)})),i.appendChild(t)}}n.suscribe((()=>{s(n.getEnabledTasks())})),s(o),e.classList.add("to-do");const a=document.createElement("style");return a.innerText="\n       .root{\n        height: 100%;\n        background-color: purple;\n       }\n       .to-do {\n        height: 100%\n        display: grid;\n        grid-template-rows: 20% 60%;\n       }\n       .inputEl,\n       .add-button {\n        border-radius: 5px;\n        height: 40px;\n        border: 0;\n       }\n       .inputEl{\n        width: 70%;\n        margin-right: 10px;\n       }\n       .add-button {\n        width: 26%;\n       }\n        ",e.querySelector(".add-button").addEventListener("click",(()=>{let t=document.querySelector("input").value;n.addTask(Math.random(),t)})),e.querySelector(".button-todo").addEventListener("click",(()=>{t.goTo("/personal-tracker/to-do")})),e.querySelector(".button-done").addEventListener("click",(()=>{t.goTo("/personal-tracker/done")})),e.appendChild(a),e}const i=[{path:/personal-tracker/,component:o},{path:/\/personal-tracker\/done/,component:function(t){const e=document.querySelector(".root"),o=n.getDisabledTasks();e.innerHTML=' \n  <my-button class="button-todo">Pendientes</my-button>\n  <my-button class="button-done">Realizados</my-button>\n  <div class="header">\n  <my-text tag="h1"> Mis pendientes </my-text> \n  <input class="inputEl" type="text" placeholder="Nuevo pendiente">\n  <button class="add-button">Agregar</button>\n  </div>\n  <ul class="lista"></ul> \n  <div class="pagenumbers" id="pagination"></div>\n  \n  ';const i=e.querySelector(".lista");function s(t){i.innerHTML="";for(const e of t){const t=document.createElement("to-do-item");t.setAttribute("id",e.id),t.setAttribute("title",e.title),e.completed&&t.setAttribute("checked","true"),t.addEventListener("change",(t=>{n.changeItemState(t.detail.id,t.detail.value)})),i.appendChild(t)}}n.suscribe((()=>{s(n.getDisabledTasks())})),s(o),e.classList.add("to-do");const a=document.createElement("style");return a.innerText="\n       .root{\n        height: 100%;\n        background-color: pink;\n       }\n       .to-do {\n        height: 100%\n        display: grid;\n        grid-template-rows: 20% 60%;\n       }\n       .inputEl,\n       .add-button {\n        border-radius: 5px;\n        height: 40px;\n        border: 0;\n       }\n       .inputEl{\n        width: 70%;\n        margin-right: 10px;\n       }\n       .add-button {\n        width: 26%;\n       }\n        ",e.querySelector(".add-button").addEventListener("click",(()=>{let t=document.querySelector("input").value;n.addTask(Math.random(),t)})),e.querySelector(".button-todo").addEventListener("click",(()=>{t.goTo("/personal-tracker/to-do")})),e.querySelector(".button-done").addEventListener("click",(()=>{t.goTo("/personal-tracker/done")})),e.appendChild(a),e}},{path:/\/personal-tracker\/to-do/,component:o}];!function(t){function e(t){history.pushState({},"",t),o(t)}function o(o){console.log("El handleRoute recibió una nueva ruta",o);for(const s of i)if(s.path.test(o)){const o=s.component({lastState:n.getState(),goTo:e});t.firstChild&&t.firstChild.remove(o)}}location.host.includes("github.io")?e("/personal-tracker/"):o(location.pathname),window.onpopstate=function(){o(location.pathname)}}(document.querySelector(".root")),n.initState();
//# sourceMappingURL=index.365fc70d.js.map
