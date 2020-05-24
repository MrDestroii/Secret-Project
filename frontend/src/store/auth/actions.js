import { authTypes } from "./types";

export const signIn = (data) => ({
  type: authTypes.AUTH_SIGN_IN,
  payload: data,
});

export const signInSuccess = (data) => ({
  type: authTypes.AUTH_SIGN_IN_SUCCESS,
  payload: data,
});

export const signUp = (data) => ({
  type: authTypes.AUTH_SIGN_UP,
  payload: data,
});

export const signUpSuccess = (data) => ({
  type: authTypes.AUTH_SIGN_UP_SUCCESS,
  payload: data,
});

export const logout = () => ({
  type: authTypes.AUTH_LOGOUT,
});
