import types from "./types";

export const push = path => ({
  type: types.PUSH,
  payload: path
});
