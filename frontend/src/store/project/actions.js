import { projectTypes } from "./types";

export const getProjects = () => ({
  type: projectTypes.PROJECTS_GET,
});

export const getProjectsSuccess = (data) => ({
  type: projectTypes.PROJECTS_GET_SUCCESS,
  payload: data,
});
