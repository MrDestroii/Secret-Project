import React, { memo, useMemo } from "react";

import PropTypes from "prop-types";

import "./styles.scss";

const Title = memo(props => {
  const { text } = props
  return text ? (
    <span className="ui-panel-header-title">{text}</span>
  ) : null
})

//TO-DO: Need collapse button with animation functional
export const Panel = (props) => {
  const { children, title, headerContent } = props;

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
      {rendererHeader}
      <div className="ui-panel-body">{children}</div>
    </div>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  headerContent: PropTypes.node,
  children: PropTypes.node.isRequired,
};

Title.propTypes = {
  text: PropTypes.string
}
