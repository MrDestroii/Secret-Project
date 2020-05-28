import { projectTypes } from "./types";

import * as R from "ramda";

const initialState = {
  items: {},
  isGetFetching: false,
  isCreateFetching: false,
  idsIsDeleting: [],
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case projectTypes.PROJECTS_GET: {
      return {
        ...state,
        isGetFetching: true,
      };
    }

    case projectTypes.PROJECTS_GET_SUCCESS: {
      const items = R.indexBy(R.prop("id"), action.payload);
      return {
        ...state,
        items,
        isGetFetching: false,
      };
    }

    case projectTypes.PROJECT_CREATE: {
      return {
        ...state,
        isCreateFetching: true,
      };
    }

    case projectTypes.PROJECT_CREATE_SUCCESS: {
      const newProject = action.payload;

      return {
        ...state,
        items: {
          ...state.items,
          [newProject.id]: {
            ...newProject,
          },
        },
        isCreateFetching: false,
      };
    }

    case projectTypes.PROJECT_DELETE: {
      return {
        ...state,
        idsIsDeleting: R.append(action.payload, state.idsIsDeleting),
      };
    }

    case projectTypes.PROJECT_DELETE_SUCCESS: {
      const deletedProject = action.payload;

      return {
        ...state,
        items: R.omit([deletedProject.id], state.items),
        idsIsDeleting: R.without([deletedProject.id], state.idsIsDeleting),
      };
    }

    default:
      return state;
  }
};
