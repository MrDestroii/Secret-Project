import { takeEvery, put, select, call } from "redux-saga/effects";

import * as R from "ramda"

import { api } from "utils/api";

import { projectTypes } from "./types";
import * as projectActions from "./actions";
import * as projectSelectors from "./selectors"

function* reloadProjects() {
  const limit  = yield select(projectSelectors.getLimit)
  const filters = yield select(projectSelectors.getFilters)
  const page = yield select(projectSelectors.getPage)
  yield put(projectActions.getProjects({ page, limit, ...filters }))
}

function* getProjects(action) {
  const { query } = action.payload
  try {
    const projects = yield api.service('project').find(query);

    yield put(projectActions.getProjectsSuccess(projects));
  } catch (e) {
    console.log({ e });
  }
}

function* createProject(action) {
  try {
    const { data, callback } = action.payload;
    const createdProject = yield api.service('project').create(data)

    yield put(projectActions.createProjectSuccess(createdProject))

    const page = yield select(projectSelectors.getPage)

    if(R.equals(0, page)) {
      yield call(reloadProjects)
    } else {
      yield put(projectActions.setPage(0))
    }

    callback && callback()
  } catch (e) {
    yield put(projectActions.createProjectError(e))
  }
}

function* deleteProject(action) {
  const id = action.payload;
  try {
    const deletedProject = yield api.service('project').remove(id)

    yield put(projectActions.deleteProjectSuccess(deletedProject))

    yield call(reloadProjects)
  } catch (e) {
    yield put(projectActions.deleteProjectError(id, e))
  }
}

function* updateProject(action) {
  const { id, data, callback } = action.payload
  try {
    const updatedProject = yield api.service('project').update(id, data)
    
    callback && callback()

    yield put(projectActions.updateProjectSuccess(updatedProject))
  } catch (e) {
    console.log({ e })
  }
}

export function* projectSaga() {
  yield takeEvery(projectTypes.PROJECTS_GET, getProjects);
  yield takeEvery(projectTypes.PROJECT_CREATE, createProject);
  yield takeEvery(projectTypes.PROJECT_DELETE, deleteProject);
  yield takeEvery(projectTypes.PROJECT_UPDATE, updateProject)
}
