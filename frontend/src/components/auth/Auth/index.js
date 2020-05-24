import React, { useCallback, useMemo } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

import * as R from "ramda";

import TypesAuth from "./TypesAuth";

import * as routerActions from "store/router/actions";

import { types } from "./config";

import "./styles.scss";

export const Auth = () => {
  const dispatch = useDispatch();

  const { type } = useParams();

  const handleChangeType = useCallback(
    (value) => () => {
      dispatch(routerActions.push(`/auth/${value}`));
    },
    [dispatch]
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

export default Auth;
