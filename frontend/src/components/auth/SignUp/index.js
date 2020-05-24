import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import * as R from "ramda";

import { Input } from "components/ui/Input";
import { Button } from "components/ui/Button";

import * as authActions from "store/auth/actions";

import "./styles.scss";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const dispatch = useDispatch();

  const handleChangeData = useCallback(
    (fieldName) => ({ target: { value } }) => {
      setData({
        ...data,
        [fieldName]: value,
      });
    },
    [data]
  );

  const handleClickSignUp = useCallback(() => {
    if (R.equals(data.repeatPassword, data.password)) {
      dispatch(authActions.signUp(data));
    }
  }, [dispatch, data]);

  return (
    <div className="sign-up-wrapper">
      <div className="sign-up-inputs">
        <Input
          label="Name"
          placeholder="Name"
          value={data.name}
          onChange={handleChangeData("name")}
        />
        <Input
          label="E-mail"
          placeholder="E-mail"
          value={data.email}
          onChange={handleChangeData("email")}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Password"
          value={data.password}
          onChange={handleChangeData("password")}
        />
        <Input
          type="password"
          label="Repeat password"
          placeholder="Repeat password"
          value={data.repeatPassword}
          onChange={handleChangeData("repeatPassword")}
        />
      </div>
      <Button title="Sign Up" onClick={handleClickSignUp} />
    </div>
  );
};

export default SignUp;
