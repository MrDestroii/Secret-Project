import SignIn from "components/auth/SignIn";
import SignUp from "components/auth/SignUp";

import { authRoute } from "helpers/route";

export const types = {
  [authRoute.signIn.param]: {
    text: "Sign In",
    component: SignIn,
  },
  [authRoute.signUp.param]: {
    text: "Sign Up",
    component: SignUp,
  },
};
