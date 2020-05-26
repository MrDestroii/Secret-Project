import React, { useEffect, useRef, useCallback } from "react";

import PropTypes from "prop-types";

import { useSpring, animated } from "react-spring";

import { ReactComponent as IconPlus } from "assets/icons/plus.svg";

import "./styles.scss";

export const ButtonCreate = (props) => {
  const { onClick, refElem } = props;

  const timer = useRef();

  const [{ transform }, set] = useSpring(() => ({
    from: { transform: "rotate(0deg)" },
  }));

  const handleMouseEnter = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    set({
      to: [{ transform: "rotate(380deg)" }, { transform: "rotate(360deg)" }],
    });
  }, [set]);

  const handleMouseLeave = useCallback(() => {
    timer.current = setTimeout(() => {
      set({ transform: "rotate(0deg)" });
    }, 1500);
  }, [set]);

  useEffect(() => {
    const elem = refElem.current;
    elem.addEventListener("mouseenter", handleMouseEnter);
    elem.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      elem.removeEventListener("mouseenter", handleMouseEnter);
      elem.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [refElem, handleMouseEnter, handleMouseLeave]);

  return (
    <animated.div style={{ transform }} className="button-create-wrapper">
      <IconPlus className="button-create-icon" onClick={onClick} />
    </animated.div>
  );
};

ButtonCreate.propTypes = {
  onClick: PropTypes.func,
  refElem: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
