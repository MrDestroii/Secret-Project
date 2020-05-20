import { authTypes } from "./types";

export const signIn = (data) => ({
  type: authTypes.AUTH_SIGN_IN,
  payload: data
})

export const signInSuccess = () => ({
  type: authTypes.AUTH_SIGN_IN_SUCCESS
})