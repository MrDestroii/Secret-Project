import { takeEvery, call, put } from "redux-saga/effects";

import { api } from "utils/api";
import { storage } from "utils/storage";

import * as authActions from 'store/auth/actions'
import * as routerActions from 'store/router/actions'

import { authTypes } from "./types";

function* signIn(action) {
  try {
    const dataAuth = yield call(api.auth, action.payload);

    const { accessToken, user } = dataAuth;

    storage('accessToken').set(accessToken)

    yield put(authActions.signInSuccess({ user }))
    yield put(routerActions.push("/"))
  } catch (e) {
    console.log({ e });
  }
}

function* logout() {
  yield storage('accessToken').remove()
  yield put(routerActions.push("/"))
}

export function* authSaga() {
  yield takeEvery(authTypes.AUTH_SIGN_IN, signIn);
  yield takeEvery(authTypes.AUTH_LOGOUT, logout)
}
