import PropTypes from "prop-types";
import React from "react";

import styles from "./constants";

const ListItem = ({ children, className, component: Component, ...other }) => (
  <Component className={className} style={styles.ListItem} {...other}>
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
