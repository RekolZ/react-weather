import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "../store/store.js"

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
