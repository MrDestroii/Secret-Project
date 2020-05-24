import React, { memo } from "react";

import PropTypes from "prop-types";

import "./styles.scss";

export const Spinner = memo((props) => {
  const { fontSize } = props;
  return (
    <div className="ui-spinner-wrapper">
      <div className="ui-spinner" style={{ fontSize }} />
    </div>
  );
});

Spinner.propTypes = {
  fontSize: PropTypes.number,
};
Spinner.defaultProps = {
  fontSize: 20,
};
