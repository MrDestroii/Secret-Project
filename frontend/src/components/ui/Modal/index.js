import React, { useState, useCallback, useEffect, memo } from "react";

import PropTypes from "prop-types";
import * as R from 'ramda'

import { ReactComponent as IconClose } from "assets/icons/close.svg";

import "./styles.scss";

const Title = memo((props) => {
  const { text } = props;

  return text ? (
    <div className="ui-modal-title-wrapper">
      <span className="ui-modal-title-text">{text}</span>
    </div>
  ) : null;
});

export const Modal = (props) => {
  const { children, refButton, title } = props;

  const [isOpen, setIsOpen] = useState();

  const handleChangeIsOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const elem = refButton.current;
    elem.addEventListener("click", handleChangeIsOpen);

    return () => elem.removeEventListener("click", handleChangeIsOpen);
  }, [handleChangeIsOpen, refButton]);

  return isOpen ? (
    <div className="ui-modal-wrapper">
      <div className="ui-modal-wrapper-dialog">
        <IconClose
          className="ui-modal-close-icon"
          onClick={handleChangeIsOpen}
        />
        <Title text={title} />
        {children(handleChangeIsOpen)}
      </div>
    </div>
  ) : null;
};

Modal.propTypes = {
  children: PropTypes.func.isRequired,
  refButton: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  title: PropTypes.string,
};

Title.propTypes = {
  text: PropTypes.string
}
