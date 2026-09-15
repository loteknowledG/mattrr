import { render } from "solid-js/web";
import App from "./App";
import "./styles.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("MATTRR_ROOT_NOT_FOUND");
}

render(() => <App />, root);
