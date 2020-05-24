import { combineReducers, applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { routerMiddleware, connectRouter } from "connected-react-router";
import { createBrowserHistory as createHistory } from "history";

import { authReducer } from "./auth/reducer";
import { projectReducer } from "./project/reducer";

import routerSaga from "./router/saga";
import { authSaga } from "./auth/saga";
import { projectSaga } from "./project/saga";

const history = createHistory();

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, routerMiddleware(history)];

const reducers = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  project: projectReducer,
});

const store = applyMiddleware(...middleware)(createStore)(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

sagaMiddleware.run(routerSaga);
sagaMiddleware.run(authSaga);
sagaMiddleware.run(projectSaga);

export { store, history };
