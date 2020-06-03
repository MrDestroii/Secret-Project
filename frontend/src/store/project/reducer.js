import { projectTypes } from "./types";

import * as R from "ramda";

const initialState = {
  items: {
    data: {},
    count: 0,
    page: 0,
    limit: 5,
  },
  filters: {
    searchValue: ""
  },
  isGetFetching: false,
  isCreateFetching: false,
  idsIsDeleting: [],
  isUpdateFetching: false,
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case projectTypes.PROJECT_SET_PAGE: {
      return {
        ...state,
        items: {
          ...state.items,
          page: action.payload
        }
      }
    }

    case projectTypes.POROJECT_SET_FILTER: {
      const { field, value } = action.payload
      return {
        ...state,
        filters: {
          ...state.filters,
          [field]: value
        }
      }
    }

    case projectTypes.PROJECTS_GET: {
      return {
        ...state,
        isGetFetching: true,
      };
    }

    case projectTypes.PROJECTS_GET_SUCCESS: {

      const data = R.compose(
        R.indexBy(R.prop("id")),
        R.propOr([], "data")
      )(action.payload);
      const count = R.propOr(R.length(data), "count")(action.payload);

      return {
        ...state,
        items: {
          ...state.items,
          data,
          count,
        },
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
      return {
        ...state,
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
        idsIsDeleting: R.without([deletedProject.id], state.idsIsDeleting),
      };
    }

    case projectTypes.PROJECT_UPDATE: {
      return {
        ...state,
        isUpdateFetching: true,
      };
    }

    case projectTypes.PROJECT_UPDATE_SUCCESS: {
      const updatedItem = action.payload;

      return {
        ...state,
        items: {
          ...state.items,
          data: {
            ...state.items.data,
            [updatedItem.id]: {
              ...updatedItem,
            }
          },
        },
        isUpdateFetching: false,
      };
    }

    case projectTypes.PROJECT_CREATE_ERROR: {
      return {
        ...state,
        isCreateFetching: false,
      };
    }

    case projectTypes.PROJECT_DELETE_ERROR: {
      const { id } = action.payload;
      return {
        ...state,
        idsIsDeleting: R.without([id], state.idsIsDeleting),
      };
    }

    case projectTypes.PROJECT_UPDATE_ERROR: {
      return {
        ...state,
        isUpdateFetching: false,
      };
    }

    default:
      return state;
  }
};
