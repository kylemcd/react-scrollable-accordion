import PropTypes from "prop-types";
import React from "react";

const ListItem = ({ children, className, component: Component }) => (
  <Component className={className}>{children}</Component>
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
