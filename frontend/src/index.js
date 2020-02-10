import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import { store, history } from "store";

import * as serviceWorker from "./service/serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>hi</div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
