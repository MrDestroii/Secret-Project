import { createSelector } from "reselect";

import * as R from "ramda";

const getState = (state) => R.defaultTo({})(R.prop("auth", state));

export const getUser = createSelector(getState, (state) =>
  R.prop(state, "user")
);

export const getIsLogged = createSelector(getState, (state) =>
  R.prop("isLogged", state)
);
