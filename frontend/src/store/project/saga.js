import { takeEvery, put } from "redux-saga/effects";

import { api } from "utils/api";

import { projectTypes } from "./types";
import * as projectActions from "./actions";

function* getProjects(action) {
  try {
    const projects = yield api.get("/project/find");

    yield put(projectActions.getProjectsSuccess(projects));
  } catch (e) {
    console.log({ e });
  }
}

export function* projectSaga() {
  yield takeEvery(projectTypes.PROJECTS_GET, getProjects);
}
