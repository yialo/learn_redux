import { Provider } from "react-redux";
import * as React from "react";
import ReactDOM from 'react-dom/client'
import { App } from "./main/c_app";
import { store } from "./store";
import "./styles.scss";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  )
}
