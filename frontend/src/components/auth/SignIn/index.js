import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { Input } from "components/ui/Input";
import { Button } from "components/ui/Button";

import * as authActions from "store/auth/actions";

import "./styles.scss";

const SignIn = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  const handleChangeSignInData = useCallback((fieldName) => ({ target: { value } }) => {
    setData({
      ...data,
      [fieldName]: value
    })
  }, [data]);

  const handleOnLogin = useCallback(() => {
    dispatch(authActions.signIn(data));
  }, [dispatch, data]);

  return (
    <div className="sign-in-wrapper">
      <div className="sign-in-inputs">
        <Input
          label="E-mail"
          placeholder="E-mail"
          name="email-signin"
          value={data.email}
          onChange={handleChangeSignInData('email')}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Password"
          name="password-signin"
          value={data.password}
          onChange={handleChangeSignInData('password')}
        />
      </div>
      <Button title="Sign In" onClick={handleOnLogin} />
    </div>
  );
};

export default SignIn;
