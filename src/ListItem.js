import PropTypes from "prop-types";
import React from "react";

const ListItem = ({ children, className, component: Component }) => (
  <Component
    aria-level="1"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...(className ? { className } : {})}
    role="listitem"
  >
    {children}
  </Component>
);

ListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.string
};

ListItem.defaultProps = {
  children: [],
  className: "",
  component: "li"
};

export default ListItem;
