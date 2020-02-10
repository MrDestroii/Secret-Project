import React, { useMemo, memo } from "react";

import classNames from "classnames";

import * as R from "ramda";

import { types } from "../config";

import "./styles.scss";

const Type = props => {
  const { handleClick, isActive, text } = props;
  return (
    <button
      onClick={handleClick}
      className={classNames("auth-type-button", {
        "auth-type-button-active": isActive
      })}
    >
      {text}
    </button>
  );
};

const renderButtonType = (handleClick, activeType) => (itemConfig, key) => {
  const isActive = R.equals(activeType, key);
  return (
    <Type
      key={key}
      handleClick={handleClick(key)}
      isActive={isActive}
      text={itemConfig.text}
    />
  );
};

const TypesAuth = memo(props => {
  const { selectedType, onChange } = props;

  const rendererButtonTypes = useMemo(
    () =>
      R.compose(
        R.values,
        R.mapObjIndexed(renderButtonType(onChange, selectedType))
      )(types),
    [selectedType, onChange]
  );

  return <div className="auth-types">{rendererButtonTypes}</div>;
});

export default TypesAuth;
