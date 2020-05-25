import React, { memo, useMemo, useState, useCallback } from "react";

import { useSpring, animated, a } from "react-spring";

import PropTypes from "prop-types";
import classNames from "classnames";
import * as R from "ramda";

import { usePrevious, useMeasure } from "hooks/spring";

import { ReactComponent as IcoonArrow } from "assets/icons/down-arrow.svg";

import "./styles.scss";

const Title = memo((props) => {
  const { text } = props;
  return text ? <span className="ui-panel-header-title">{text}</span> : null;
});

const CollapseButton = (props) => {
  const { isOpen, onClick } = props;
  return (
    <div className="ui-panel-arrow-icon-wrapper" onClick={onClick}>
      <IcoonArrow
        className={classNames("ui-panel-arrow-icon", {
          "ui-panel-arrow-icon-not-open": !isOpen,
        })}
      />
    </div>
  );
};

export const Panel = (props) => {
  const { children, title, headerContent } = props;

  const [isOpen, setIsOpen] = useState(true);
  const previousIsOpen = usePrevious(isOpen);
  const [bind, { height: viewHeight }] = useMeasure();

  const { height } = useSpring({
    from: { height: 0 },
    to: { height: isOpen ? viewHeight : 0 },
  });

  const currentHeight = useMemo(
    () => (isOpen && R.equals(previousIsOpen, isOpen) ? "auto" : height),
    [isOpen, previousIsOpen, height]
  );

  const handleChangeIsOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const rendererHeader = useMemo(() => {
    return title || headerContent ? (
      <div className="ui-panel-header">
        <Title text={title} />
        {headerContent}
      </div>
    ) : null;
  }, [title, headerContent]);

  return (
    <div className="ui-panel-wrapper">
      <CollapseButton isOpen={isOpen} onClick={handleChangeIsOpen} />
      {rendererHeader}
      <animated.div className="ui-panel-body" style={{ height: currentHeight }}>
        <a.div {...bind} children={children} />
      </animated.div>
    </div>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  headerContent: PropTypes.node,
  children: PropTypes.node.isRequired,
};

Title.propTypes = {
  text: PropTypes.string,
};
