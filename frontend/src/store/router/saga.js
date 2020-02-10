import { put, takeEvery } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import types from './types'

export function* routerPush(action) {
  yield put(push(action.payload))
}

function* routerSaga() {
  yield takeEvery(types.PUSH, routerPush)
}

export default routerSaga