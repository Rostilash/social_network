import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/redux-store";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

const renderEntireTree = (state) => {
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};

store.subscribe(() => {
  renderEntireTree(store.getState());
});

renderEntireTree(store.getState());
