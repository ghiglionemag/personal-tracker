import { state } from "../../state";

export function initToDoPage(containerEl) {
  const div = document.querySelector(".root");

  const tasks = state.getEnabledTasks();

  div.innerHTML = `
  <div class="nav">
  <my-button class="button-todo">Pendientes</my-button>
  <my-button class="button-done">Realizados</my-button>
  <div class="header">
  <my-text tag="h1"> Pendientes </my-text> 
  <input class="inputEl" type="text" placeholder="Nuevo pendiente">
  <button class="add-button">Agregar</button>
  </div>
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
        console.log(e);
        state.changeItemState(e.detail.id, e.detail.value);
      });
      tasksList.appendChild(toDoItemEl);
    }
  }

  state.suscribe(() => {
    createTasks(state.getEnabledTasks());
  });

  createTasks(tasks);

 
  div.querySelector(".add-button").addEventListener("click", () => {
    const inputEl = document.querySelector("input");
    let title = inputEl.value;
    state.addTask(Math.random(), title);
  });

  div.querySelector(".button-todo").addEventListener("click", () => {
    containerEl.goTo("/personal-tracker/to-do");
  });
  div.querySelector(".button-done").addEventListener("click", () => {
    containerEl.goTo("/personal-tracker/done");
  });


 
  return div;
}
