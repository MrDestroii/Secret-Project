import React, { useMemo, useCallback, useState } from "react";

import PropsTypes from "prop-types";
import classNames from "classnames";

import * as R from "ramda";

import { HiddingPassword } from "./HiddingPassword";

import "./styles.scss";

const isRightPosition = R.equals("right");
const isLeftPosition = R.equals("left");

export const Input = (props) => {
  const {
    label,
    placeholder,
    value,
    onChange,
    type,
    classes,
    name,
    icon,
    iconPosition,
  } = props;

  const [isHiddenPassword, setIsHiddenPassword] = useState(true);

  const isTypePassword = useMemo(() => R.equals(type, "password"), [type]);
  const isNotNilIcon = useMemo(() => R.compose(R.not, R.isNil)(icon), [icon]);

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
  const classNameInput = useMemo(() => {
    const isNotNilIconOrIsPassword = R.or(isNotNilIcon, isTypePassword);
    const classNamesIconPosition = classNames({
      "ui-input-icon-position": isNotNilIconOrIsPassword,
      left: isLeftPosition(iconPosition) && isNotNilIcon,
      right:
        R.or(isRightPosition(iconPosition), isTypePassword) &&
        isNotNilIconOrIsPassword,
    });
    return classNames("ui-input", classNamesIconPosition, currentClasses.input);
  }, [currentClasses.input, isTypePassword, isNotNilIcon, iconPosition]);

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

  const rendererIcon = useMemo(() => {
    return isNotNilIcon ? (
      <div className={classNames("ui-input-icon-wrapper", iconPosition)}>
        <div className="ui-input-icon">{icon}</div>
      </div>
    ) : null;
  }, [isNotNilIcon, icon, iconPosition]);

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
        {rendererIcon}
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
  icon: PropsTypes.oneOfType([PropsTypes.node, PropsTypes.instanceOf(Element)]),
  iconPosition: PropsTypes.oneOf(["left", "right"]),
};

Input.defaultProps = {
  type: "text",
  classes: {},
  iconPosition: "left",
};
