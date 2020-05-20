import React, { useState, useCallback } from "react";

import "./styles.scss";
import { Input } from "components/ui/Input";
import { Button } from "components/ui/Button";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setrepeatPassword] = useState("");

  const handleChangeEmail = useCallback(({ target: { value } }) => {
    setEmail(value);
  }, []);

  const handleChangePassword = useCallback(({ target: { value } }) => {
    setPassword(value);
  }, []);

  const handleChangeRepeatPassword = useCallback(({ target: { value } }) => {
    setrepeatPassword(value);
  }, []);

  const handleClickSignUp = useCallback(() => {
    console.log("click sign up");
  }, []);

  return (
    <div className="sign-up-wrapper">
      <div className="sign-up-inputs">
        <Input
          label="E-mail"
          placeholder="E-mail"
          value={email}
          onChange={handleChangeEmail}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Password"
          value={password}
          onChange={handleChangePassword}
        />
        <Input
          type="password"
          label="Repeat password"
          placeholder="Repeat password"
          value={repeatPassword}
          onChange={handleChangeRepeatPassword}
        />
      </div>
      <Button title="Sign Up" onClick={handleClickSignUp} />
    </div>
  );
};

export default SignUp;
