import { takeEvery, call } from "redux-saga/effects";
import { authTypes } from "./types";
import { api } from "utils/api";

function* signIn(action) {
  try {
    const dataAuth = yield call(api.auth, action.payload);

    const { accessToken, user } = dataAuth;

    localStorage.setItem('secret-project:accessToken', accessToken)
  } catch (e) {
    console.log({ e });
  }
}

export function* authSaga() {
  yield takeEvery(authTypes.AUTH_SIGN_IN, signIn);
}
