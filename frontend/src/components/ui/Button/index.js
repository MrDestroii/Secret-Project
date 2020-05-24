import React, { useMemo } from "react";

import * as R from "ramda";

import PropTypes from "prop-types";
import classNames from "classnames";

import "./styles.scss";

export const Button = (props) => {
  const { title, onClick, classes } = props;

  const currentClasses = useMemo(() => {
    return R.merge(Button.defaultProps.classes, classes);
  }, [classes]);

  const classNameWrapper = useMemo(
    () => classNames("ui-button-wrapper", currentClasses.wrapper),
    [currentClasses.wrapper]
  );
  const classNameButton = useMemo(
    () => classNames("ui-button", currentClasses.button),
    [currentClasses.button]
  );

  return (
    <div className={classNameWrapper}>
      <button className={classNameButton} onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

Button.propTypes = {
  title: PropTypes.node,
  onClick: PropTypes.func,
  classes: PropTypes.shape({
    wrapper: PropTypes.string,
    button: PropTypes.string,
  }),
};

Button.defaultProps = {
  classes: {},
};
