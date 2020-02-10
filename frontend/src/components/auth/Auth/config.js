import SignIn from 'components/auth/SignIn'
import SignUp from 'components/auth/SignUp'

export const types = {
  login: {
    text: "Sign In",
    component: SignIn
  },
  registration: {
    text: "Sign Up",
    component: SignUp
  }
};
