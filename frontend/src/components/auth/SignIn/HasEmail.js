import React, { memo } from "react";

import PropTypes from "prop-types";

export const HasEmail = memo((props) => {
  const { email, onClickEmail } = props;
  return (
    <span
      title="Click for change E-mail"
      onClick={onClickEmail}
      className="sign-in-has-email"
    >{`Your E-mail: ${email}`}</span>
  );
});

HasEmail.propTypes = {
  email: PropTypes.string.isRequired,
  onClickEmail: PropTypes.func.isRequired,
};
