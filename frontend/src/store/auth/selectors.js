import { createSelector } from "reselect";

import * as R from "ramda";

const getState = (state) => R.defaultTo({})(R.prop("auth", state));

export const getUser = createSelector(getState, (state) =>
  R.prop("user", state)
);

export const getIsLogged = createSelector(getState, (state) =>
  R.prop("isLogged", state)
);

export const getSignUp = createSelector(getState, (state) =>
  R.prop("signUp", state)
);
