import React, { memo } from "react";

import PropTypes from "prop-types";

import { useSpring, a } from "react-spring";

import { ReactComponent as IconClose } from "assets/icons/close.svg";
import { ReactComponent as IconPencil } from "assets/icons/pencil.svg";

import "./styles.scss";

export const Actions = memo((props) => {
  const { isOpen, onClickClose, onClickEdit } = props;

  const { opacity, transform } = useSpring({
    from: { opacity: 0, transform: "translate3d(15px,0,0)" },
    to: {
      opacity: isOpen ? 1 : 0,
      transform: `translate3d(${isOpen ? 0 : 15}px,0,0)`,
    },
  });

  return (
    <a.div className="ui-actions-wrapper" style={{ opacity, transform }}>
      <IconPencil className="ui-actions-icon" onClick={onClickEdit} />
      <IconClose className="ui-actions-icon" onClick={onClickClose} />
    </a.div>
  );
});

Actions.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickClose: PropTypes.func.isRequired,
};
