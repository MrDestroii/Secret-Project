import { projectTypes } from "./types";

import * as R from "ramda";

const initialState = {
  items: {},
  isGetFetching: false,
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
        isGetFetching: false
      };
    }

    default:
      return state;
  }
};
