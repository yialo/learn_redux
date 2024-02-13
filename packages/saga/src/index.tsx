import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { App } from "./main/c_app";
import { store } from "./store";

import "./styles.scss";

const rootElement = document.getElementById("root");

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

render(<Root />, rootElement);
