import { combineReducers, applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { routerMiddleware, connectRouter } from 'connected-react-router'
import { createBrowserHistory as createHistory } from 'history'

import routerSaga from './router/saga'

const history = createHistory()

const sagaMiddleware = createSagaMiddleware()

const middleware = [
  sagaMiddleware,
  routerMiddleware(history)
]

const reducers = combineReducers({
  router: connectRouter(history),
})

const store = applyMiddleware(...middleware)(createStore)(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

sagaMiddleware.run(routerSaga)

export {
  store,
  history,
}