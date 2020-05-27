import { projectTypes } from "./types";

export const getProjects = () => ({
  type: projectTypes.PROJECTS_GET,
});

export const getProjectsSuccess = (data) => ({
  type: projectTypes.PROJECTS_GET_SUCCESS,
  payload: data,
});

export const createProject = (data, callback) => ({
  type: projectTypes.PROJECT_CREATE,
  payload: {data, callback},
});

export const createProjectSuccess = (project) => ({
  type: projectTypes.PROJECT_CREATE_SUCCESS,
  payload: project,
});
