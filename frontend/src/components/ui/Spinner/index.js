import React, { memo } from "react";

import PropTypes from "prop-types";
import classNames from "classnames";

import "./styles.scss";

export const Spinner = memo((props) => {
  const { fontSize, classes } = props;
  return (
    <div className={classNames("ui-spinner-wrapper", classes.wrapper)}>
      <div
        className={classNames("ui-spinner", classes.spinner)}
        style={{ fontSize }}
      />
    </div>
  );
});

Spinner.propTypes = {
  fontSize: PropTypes.number,
  classes: PropTypes.shape({
    wrapper: PropTypes.string,
    spinner: PropTypes.string,
  }),
};

Spinner.defaultProps = {
  fontSize: 20,
  classes: {},
};
