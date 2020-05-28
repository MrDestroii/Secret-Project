import { createSelector } from "reselect";

import * as R from "ramda";

const getState = R.prop("project");

export const getItems = createSelector(getState, R.prop("items")
);

export const getIsGetFetching = createSelector(getState, R.prop("isGetFetching")
);

export const getIsCreateFetching = createSelector(getState, R.prop("isCreateFetching")
);

export const getIdsIsDeleting = createSelector(getState, R.prop('idsIsDeleting'))
