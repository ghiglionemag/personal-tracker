import { state } from "../../state";

export function initHomePage(containerEl) {
  const div = document.createElement("div");
  const tasks = state.getEnabledTasks();

  div.innerHTML = ` 
  <div class="header">
  <my-text tag="h1"> Mis pendientes </my-text> 
  <input class="inputEl" type="text" placeholder="Nuevo pendiente">
  <button class="add-button">Agregar</button>
  </div>
  <ul class="lista"></ul> 
  <div class="pagenumbers" id="pagination"></div>
  
  `;

  const tasksList = div.querySelector(".lista");

  function createTasks(items) {
    tasksList.innerHTML = "";
    for (const item of items) {
      const toDoItemEl = document.createElement("to-do-item");
      toDoItemEl.setAttribute("id", item.id);
      toDoItemEl.setAttribute("title", item.title);
      if (item.completed) {
        toDoItemEl.setAttribute("checked", "true");
      }
      toDoItemEl.addEventListener("change", (e: any) => {
        state.changeItemState(e.detail.id, e.detail.value);
      });
      tasksList.appendChild(toDoItemEl);
    }
  }

  state.suscribe(() => {
    createTasks(state.getEnabledTasks());
  });

  createTasks(tasks);

  div.classList.add("to-do");
  const style = document.createElement("style");
  style.innerText = `
       .root{
        height: 100%;
       }
       .to-do {
        height: 100%
        display: grid;
        grid-template-rows: 20% 60%;
       }
       .inputEl,
       .add-button {
        border-radius: 5px;
        height: 40px;
        border: 0;
       }
       .inputEl{
        width: 70%;
        margin-right: 10px;
       }
       .add-button {
        width: 26%;
       }
        `;

  div.querySelector(".add-button").addEventListener("click", () => {
    const inputEl = document.querySelector("input");
    let title = inputEl.value;
    state.addTask(Math.random(), title);
  });

 
  containerEl.appendChild(div);
  containerEl.appendChild(style);
}
