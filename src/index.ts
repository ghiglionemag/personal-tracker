import "./components/text"
import "./components/nav"
import "./components/to-do-item";
import { initHomePage } from "./pages/home";
import { state } from "./state";

function main() {
  const rootElement = document.querySelector(".root");
  initHomePage(rootElement);
  state.initState();
}
main();
