import React, { memo } from "react";

import PropTypes from "prop-types";

import { ReactComponent as ShowEye } from "assets/icons/show-eye.svg";
import { ReactComponent as HideEye } from "assets/icons/hide-eye.svg";

export const HiddingPassword = memo((props) => {
  const { isHidden, onChange } = props;

  return (
    <div className="ui-hidding-password" onClick={onChange}>
      {isHidden ? <HideEye /> : <ShowEye />}
    </div>
  );
});

HiddingPassword.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
