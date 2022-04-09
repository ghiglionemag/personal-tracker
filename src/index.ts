import "./components/text";
import "./components/nav";
import "./components/to-do-item";
import { initRouter } from "./router";
import { state } from "./state";

function main() {
  const rootElement = document.querySelector(".root");
  initRouter(rootElement);
  state.initState();
}
main();
