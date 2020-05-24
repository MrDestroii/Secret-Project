import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";

import { Button } from "components/ui/Button";

import * as routerActions from "store/router/actions";

import './styles.scss'

export const PageNotFound = memo(() => {
  const dispatch = useDispatch();

  const handleOnClick = useCallback(() => {
    dispatch(routerActions.push("/"));
  }, [dispatch]);

  return (
    <div className="page-not-found-wrapper">
      <span className="page-not-found-text">Page Not Found</span>
      <Button title="To Main Page" onClick={handleOnClick} />
    </div>
  );
});
