import React, { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as R from "ramda";

import { Input } from "components/ui/Input";
import { Button } from "components/ui/Button";
import { HasEmail } from "./HasEmail";

import * as authActions from "store/auth/actions";
import { getSignUp } from "store/auth/selectors";

import "./styles.scss";

const SignIn = () => {
  const signUpData = useSelector(getSignUp);
  const signUpEmail = useMemo(() => R.prop("email", signUpData), [signUpData]);

  const [isNotHasSignUpEmail, setIsNotHasSignUpEmail] = useState(
    R.isNil(signUpEmail)
  );
  const [data, setData] = useState({
    email: R.defaultTo("", signUpEmail),
    password: "",
  });

  const dispatch = useDispatch();

  const handleChangeSignInData = useCallback(
    (fieldName) => ({ target: { value } }) => {
      setData({
        ...data,
        [fieldName]: value,
      });
    },
    [data]
  );

  const handleOnLogin = useCallback(() => {
    dispatch(authActions.signIn(data));
  }, [dispatch, data]);

  const rendererEmailContent = useMemo(() => {
    return isNotHasSignUpEmail ? (
      <Input
        label="E-mail"
        placeholder="E-mail"
        name="email-signin"
        value={data.email}
        onChange={handleChangeSignInData("email")}
      />
    ) : (
      <HasEmail
        email={data.email}
        onClickEmail={() => setIsNotHasSignUpEmail(true)}
      />
    );
  }, [isNotHasSignUpEmail, data.email, handleChangeSignInData]);

  return (
    <div className="sign-in-wrapper">
      <div className="sign-in-inputs">
        {rendererEmailContent}
        <Input
          type="password"
          label="Password"
          placeholder="Password"
          name="password-signin"
          value={data.password}
          onChange={handleChangeSignInData("password")}
        />
      </div>
      <Button title="Sign In" onClick={handleOnLogin} />
    </div>
  );
};

export default SignIn;
