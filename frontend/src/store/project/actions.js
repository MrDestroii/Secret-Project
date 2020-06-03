import { projectTypes } from "./types";

export const getProjects = (query) => ({
  type: projectTypes.PROJECTS_GET,
  payload: { query },
});

export const getProjectsSuccess = (data) => ({
  type: projectTypes.PROJECTS_GET_SUCCESS,
  payload: data,
});

export const getProjectsError = (e) => ({
  type: projectTypes.PROJECTS_GET_ERROR,
  payload: e,
});

export const createProject = (data, callback) => ({
  type: projectTypes.PROJECT_CREATE,
  payload: { data, callback },
});

export const createProjectSuccess = (project) => ({
  type: projectTypes.PROJECT_CREATE_SUCCESS,
  payload: project,
});

export const createProjectError = (e) => ({
  type: projectTypes.PROJECT_CREATE_ERROR,
  payload: e,
});

export const deleteProject = (id) => ({
  type: projectTypes.PROJECT_DELETE,
  payload: id,
});

export const deleteProjectSuccess = (data) => ({
  type: projectTypes.PROJECT_DELETE_SUCCESS,
  payload: data,
});

export const deleteProjectError = (id, e) => ({
  type: projectTypes.PROJECT_DELETE_ERROR,
  payload: { e, id },
});

export const updateProject = (id, data, callback) => ({
  type: projectTypes.PROJECT_UPDATE,
  payload: {
    id,
    data,
    callback,
  },
});

export const updateProjectSuccess = (data) => ({
  type: projectTypes.PROJECT_UPDATE_SUCCESS,
  payload: data,
});

export const updateProjectError = (e) => ({
  type: projectTypes.PROJECT_UPDATE_ERROR,
  payload: e,
});
