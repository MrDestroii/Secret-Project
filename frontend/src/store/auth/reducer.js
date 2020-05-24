import { authTypes } from "./types";
import { storage } from "utils/storage";

const initialState = {
  user: {},
  signUp: {},
  isLogged: storage("accessToken").has(),
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.AUTH_SIGN_IN_SUCCESS: {
      const { user } = action.payload;
      return {
        ...state,
        user,
        isLogged: true,
        signUp: initialState.signUp
      };
    }

    case authTypes.AUTH_SIGN_UP_SUCCESS: {
      const { email } = action.payload

      return {
        ...state,
        signUp: {
          ...state.signUp,
          email
        }
      }
    }

    case authTypes.AUTH_LOGOUT: {
      return {
        ...state,
        isLogged: false,
      };
    }

    default:
      return state;
  }
};
