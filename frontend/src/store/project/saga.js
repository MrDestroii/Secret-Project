import { takeEvery, put } from "redux-saga/effects";

import { api } from "utils/api";

import { projectTypes } from "./types";
import * as projectActions from "./actions";

function* getProjects() {
  try {
    const projects = yield api.get("/project/find");

    yield put(projectActions.getProjectsSuccess(projects));
  } catch (e) {
    console.log({ e });
  }
}

function* createProject(action) {
  try {
    const { data, callback } = action.payload;
    const createdProject = yield api.post("/project/create", data)

    yield put(projectActions.createProjectSuccess(createdProject))

    callback && callback()
  } catch (e) {
    console.log({ e });
  }
}

export function* projectSaga() {
  yield takeEvery(projectTypes.PROJECTS_GET, getProjects);
  yield takeEvery(projectTypes.PROJECT_CREATE, createProject);
}
