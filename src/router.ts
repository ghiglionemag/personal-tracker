import { initDonePage } from "./pages/done";
import { initToDoPage } from "./pages/to-do";
import { state } from "./state";

const routes = [
  { path: /\//, component: initDonePage },
  {
    path: /\/done/,
    component: initDonePage,
  },
  {
    path: /\/to-do/,
    component: initToDoPage,
  },
];

export function initRouter(conteiner: any) {
  function goTo(path) {
    history.pushState({}, "", path);
    handleRoute(path);
  }

  function handleRoute(route) {
    console.log("El handleRoute recibió una nueva ruta", route);

    for (const r of routes) {
      if (r.path.test(route)) {
        const el = r.component({ lastState: state.getState(), goTo: goTo });

        if (conteiner.firstChild) {
          conteiner.firstChild.remove(el);
        }
      }
    }
  }

  if (location.host.includes("github.io")) {
    goTo("/done");
  } else {
    handleRoute(location.pathname);
  }

  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}
