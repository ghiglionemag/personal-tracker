import { state } from "../../state";

export function initToDoPage(containerEl) {
  const div = document.querySelector(".root");

  const tasks = state.getEnabledTasks();

  div.innerHTML = `
  <div class="nav">
  <button class="button-todo button is-primary is-light is-responsive">Pendientes</button>
  <button class="button-done button is-primary is-responsive">Realizados</button>
  </div>

  <div class="header">
  <input class="inputEl input is-success" type="text" placeholder="Nuevo pendiente">
  <button class="add-button button is-primary">Agregar</button>
  </div>


  <ul class="lista scroll"></ul> 
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
