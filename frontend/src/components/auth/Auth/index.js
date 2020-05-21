import React, { useState, useCallback, useMemo } from "react";

import * as R from "ramda";

import TypesAuth from "./TypesAuth";

import { types } from "./config";

import "./styles.scss";

export const Auth = (props) => {
  const [type, setType] = useState("login");

  const handleChangeType = useCallback(
    (value) => () => {
      setType(value);
    },
    []
  );

  const Content = useMemo(() => R.path([type, "component"], types), [type]);

  return (
    <div className="auth-wrapper">
      <div className="auth">
        <TypesAuth selectedType={type} onChange={handleChangeType} />
        <Content />
      </div>
    </div>
  );
};
