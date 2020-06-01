import React, { memo } from "react";

import { ReactComponent as IconArrow } from "assets/icons/down-arrow.svg";
import { ReactComponent as IconDoubleArrow } from "assets/icons/down-arrow-double.svg";

export const ControlsIcon = memo((props) => {
  const { isDouble, ...otherProps } = props;
  const Icon = isDouble ? IconDoubleArrow : IconArrow;

  return <Icon {...otherProps} />;
});
