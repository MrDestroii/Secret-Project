import { createSelector } from "reselect";

import * as R from "ramda";

const getState = R.prop("project");

const getItems = createSelector(getState, R.prop("items"))

export const getItemsData = createSelector(getItems, R.prop("data")
);

export const getItemsCount = createSelector(getItems, R.prop("count"))

export const getIsGetFetching = createSelector(getState, R.prop("isGetFetching")
);

export const getIsCreateFetching = createSelector(getState, R.prop("isCreateFetching")
);

export const getIdsIsDeleting = createSelector(getState, R.prop('idsIsDeleting'))

export const getIsUpdateFetching = createSelector(getState, R.prop('isUpdateFetching'))