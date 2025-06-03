import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/state";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

const renderEntireTree = (state) => {
  root.render(
    <BrowserRouter>
      <App state={state} dispatch={store.dispatch.bind(store)} store={store} />
    </BrowserRouter>
  );
};

store.subscribe(() => {
  renderEntireTree(store.getState());
});

renderEntireTree(store.getState());
