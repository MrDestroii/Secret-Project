import React, { useMemo, useCallback, useState } from "react";

import PropsTypes from "prop-types";
import classNames from "classnames";

import * as R from "ramda";

import { HiddingPassword } from "./HiddingPassword";

import "./styles.scss";

export const Input = (props) => {
  const { label, placeholder, value, onChange, type, classes, name } = props;

  const [isHiddenPassword, setIsHiddenPassword] = useState(true);

  const isTypePassword = useMemo(() => R.equals(type, "password"), [type]);

  const currentClasses = useMemo(() => {
    return R.merge(Input.defaultProps.classes, classes);
  }, [classes]);

  const rendererLabel = useMemo(() => {
    if (label) {
      const className = classNames("ui-input-label", currentClasses.label);
      return <label className={className}>{label}</label>;
    }
  }, [label, currentClasses.label]);

  const classNameWrapper = useMemo(
    () => classNames("ui-input-wrapper", currentClasses.wrapper),
    [currentClasses.wrapper]
  );
  const classNameInput = useMemo(
    () =>
      classNames(
        "ui-input",
        {
          "ui-input-password": isTypePassword,
        },
        currentClasses.input
      ),
    [currentClasses.input, isTypePassword]
  );

  const handleChangeHiddenPassword = useCallback(() => {
    setIsHiddenPassword(!isHiddenPassword);
  }, [isHiddenPassword]);

  const rendererHiddingPassword = useMemo(() => {
    return (
      isTypePassword && (
        <HiddingPassword
          isHidden={isHiddenPassword}
          onChange={handleChangeHiddenPassword}
        />
      )
    );
  }, [isTypePassword, handleChangeHiddenPassword, isHiddenPassword]);

  const currentType = useMemo(() => {
    return isTypePassword && !isHiddenPassword ? "text" : type;
  }, [isTypePassword, isHiddenPassword, type]);

  return (
    <div className={classNameWrapper}>
      {rendererLabel}
      <div className="ui-input-main">
        <input
          type={currentType}
          name={name}
          className={classNameInput}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {rendererHiddingPassword}
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropsTypes.string,
  placeholder: PropsTypes.string,
  name: PropsTypes.string,
  value: PropsTypes.string,
  onChange: PropsTypes.func.isRequired,
  type: PropsTypes.oneOf(["text", "password"]),
  classes: PropsTypes.shape({
    label: PropsTypes.string,
    wrapper: PropsTypes.string,
    input: PropsTypes.string,
  }),
};

Input.defaultProps = {
  type: "text",
  classes: {},
};
