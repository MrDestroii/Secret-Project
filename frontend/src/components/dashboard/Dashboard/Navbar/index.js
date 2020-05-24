import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { Button } from "components/ui/Button";

import * as authActions from 'store/auth/actions'

import "./styles.scss";

export const Navbar = () => {
  const dispatch = useDispatch()

  const handleClickLogout = useCallback(() => {
    dispatch(authActions.logout())
  }, [dispatch]);

  return (
    <div className="navbar-wrapper">
      <span>Secret Project</span>
      <Button title="Logout" onClick={handleClickLogout} />
    </div>
  );
};
