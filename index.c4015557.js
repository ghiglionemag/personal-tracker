class t extends HTMLElement{constructor(){super(),this.tags=["h1","h2","p"],this.tag="p",this.shadow=this.attachShadow({mode:"open"}),this.tags.includes(this.getAttribute("tag"))&&(this.tag=this.getAttribute("tag")||this.tag),this.render()}render(){const t=document.createElement("style");t.innerHTML="\n    h1{\n        font-size: 25pxpx;\n        font-weight: bold;\n        background-color: blue;\n        max-width: 98%;\n      }\n      h2{\n        font-size: 25px;\n        font-weight: bold;\n        height: 35px;\n      }\n      h2:hover{\n          background-color: #fff;\n      }\n      p{\n        font-size: 18px;\n        \n        color: #00d1b2;\n      }\n      h1,\n      h2{\n        font-family: 'Fira Sans', sans-serif;\n        background-color: rgba(255, 255, 255, 0.5);\n        color: #000;\n        border-radius: 10px;\n        text-align: center;\n      }\n      ";const e=document.createElement(this.tag);e.textContent=this.textContent,this.shadow.appendChild(t),this.shadow.appendChild(e)}}customElements.define("my-text",t),customElements.define("to-do-item",class extends HTMLElement{constructor(){super(),this.checked=!1,this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.title=this.getAttribute("title")||"",this.checked=this.hasAttribute("checked"),this.id=this.getAttribute("id");const t=document.createElement("style");t.innerText="\n       \n        .item {\n            display: flex;\n            justify-content: space-between;\n            padding: 22px 13px;\n            font-size: 18px;\n            background-color: rgba(255, 255, 255, 0.5);\n            color: #000;\n            border-radius: 10px;\n        }\n        @media (max-width: 912px) {\n          .item{\n            flex-direction: column;\n          }\n        }\n\n        .titulo.checked{\n            text-decoration: line-through;\n        }\n        .checkbox-input {\n          margin-top: 15px;\n          height: 20px;\n          width: 20px;\n        }\n        ",this.shadow.appendChild(t),this.render()}addListeners(){this.shadow.querySelector(".checkbox-input").addEventListener("click",(t=>{const e=t.target,n=new CustomEvent("change",{detail:{id:this.id,value:e.checked,deleted:!0}});this.dispatchEvent(n)}))}render(){const t=document.createElement("div");t.innerHTML=`\n      <my-text tag="p" class="titulo ${this.checked?"checked":""}"> ${this.title} </my-text>\n      <input class="checkbox-input" type="checkbox"\n      ${this.checked?"checked":""}\n      />\n      `,t.classList.add("item"),this.shadow.appendChild(t),this.addListeners()}});const e={data:{tasks:[{id:1,title:"primer item",completed:!1},{id:2,title:"segundo item",completed:!1},{id:3,title:"tercer item",deleted:!0}]},listeners:[],getState(){return this.data},getEnabledTasks(){return this.getState().tasks.filter((t=>0==t.completed))},getDisabledTasks(){return this.getState().tasks.filter((t=>0==!t.completed))},addTask(t,e){const n=this.getState();n.tasks.push({id:t,title:e,completed:!1}),this.setState(n)},changeItemState(t,e){const n=this.getState(),s=n.tasks.find((e=>e.id==t));s.completed=e,console.log(s),this.setState(n)},setState(t){this.data=t;for(const t of this.listeners)t();localStorage.setItem("saved-state",JSON.stringify(t))},suscribe(t){this.listeners.push(t)}};function n(t){const n=document.querySelector(".root"),s=e.getEnabledTasks();n.innerHTML='\n  <div class="nav">\n  <button class="button-todo button is-primary is-light is-responsive">Pendientes</button>\n  <button class="button-done button is-primary is-responsive">Realizados</button>\n  </div>\n\n  <div class="header">\n  <input class="inputEl input is-success" type="text" placeholder="Nuevo pendiente">\n  <button class="add-button button is-primary">Agregar</button>\n  </div>\n\n\n  <ul class="lista"></ul> \n  <div class="pagenumbers" id="pagination"></div>\n  \n  ';const o=n.querySelector(".lista");function i(t){o.innerHTML="";for(const n of t){const t=document.createElement("to-do-item");t.setAttribute("id",n.id),t.setAttribute("title",n.title),n.completed&&t.setAttribute("checked","true"),t.addEventListener("change",(t=>{console.log(t),e.changeItemState(t.detail.id,t.detail.value)})),o.appendChild(t)}}return e.suscribe((()=>{i(e.getEnabledTasks())})),i(s),n.querySelector(".add-button").addEventListener("click",(()=>{let t=document.querySelector("input").value;e.addTask(Math.random(),t)})),n.querySelector(".button-todo").addEventListener("click",(()=>{t.goTo("/personal-tracker/to-do")})),n.querySelector(".button-done").addEventListener("click",(()=>{t.goTo("/personal-tracker/done")})),n}const s=[{path:/personal-tracker/,component:n},{path:/\/personal-tracker\/done/,component:function(t){const n=document.querySelector(".root"),s=e.getDisabledTasks();n.innerHTML=' \n\n  <div class="nav">\n  <button class="button-todo button is-primary  is-responsive">Pendientes</button>\n  <button class="button-done button is-primary is-light is-responsive">Realizados</button>\n  </div>\n\n  <div class="header">\n  <input class="inputEl input is-success" type="text" placeholder="Nuevo pendiente">\n  <button class="add-button button is-primary">Agregar</button>\n  </div>\n  \n  <ul class="lista"></ul> \n  <div class="pagenumbers" id="pagination"></div>\n  \n  ';const o=n.querySelector(".lista");function i(t){o.innerHTML="";for(const n of t){const t=document.createElement("to-do-item");t.setAttribute("id",n.id),t.setAttribute("title",n.title),n.completed&&t.setAttribute("checked","true"),t.addEventListener("change",(t=>{e.changeItemState(t.detail.id,t.detail.value)})),o.appendChild(t)}}return e.suscribe((()=>{i(e.getDisabledTasks())})),i(s),n.querySelector(".add-button").addEventListener("click",(()=>{let t=document.querySelector("input").value;e.addTask(Math.random(),t)})),n.querySelector(".button-todo").addEventListener("click",(()=>{t.goTo("/personal-tracker/to-do")})),n.querySelector(".button-done").addEventListener("click",(()=>{t.goTo("/personal-tracker/done")})),n}},{path:/\/personal-tracker\/to-do/,component:n}];!function(t){function n(t){history.pushState({},"",t),o(t)}function o(o){console.log("El handleRoute recibió una nueva ruta",o);for(const i of s)if(i.path.test(o)){const s=i.component({lastState:e.getState(),goTo:n});t.firstChild&&t.firstChild.remove(s)}}location.host.includes("github.io")?n("/personal-tracker/"):o(location.pathname),window.onpopstate=function(){o(location.pathname)}}(document.querySelector(".root")),e.getState();
//# sourceMappingURL=index.c4015557.js.map