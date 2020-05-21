import { authTypes } from "./types";

export const signIn = (data) => ({
  type: authTypes.AUTH_SIGN_IN,
  payload: data
})

export const signInSuccess = (data) => ({
  type: authTypes.AUTH_SIGN_IN_SUCCESS,
  payload: data
})

export const logout = () => ({
  type: authTypes.AUTH_LOGOUT
})