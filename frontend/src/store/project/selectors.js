import { createSelector } from "reselect";

import * as R from "ramda";

const getState = (state) => R.prop("project", state);

export const getItems = createSelector(getState, (state) =>
  R.prop("items", state)
);

export const getIsGetFetching = createSelector(getState, (state) =>
  R.prop("isGetFetching", state)
);

export const getIsCreateFetching = createSelector(getState, (state) =>
  R.prop("isCreateFetching", state)
);
