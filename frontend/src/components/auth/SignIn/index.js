import React, { useState, useCallback } from "react";

import { Input } from "components/ui/Input";
import { Button } from "components/ui/Button";

import "./styles.scss";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = useCallback(({ target: { value } }) => {
    setEmail(value);
  }, []);

  const handleChangePassword = useCallback(({ target: { value } }) => {
    setPassword(value);
  }, []);

  const handleOnLogin = useCallback(() => {
    console.log("Login");
  }, []);

  return (
    <div className="sign-in-wrapper">
      <div className="sign-in-inputs">
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
      </div>
      <Button title="Sign In" onClick={handleOnLogin} />
    </div>
  );
};

export default SignIn;
