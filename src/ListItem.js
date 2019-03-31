import PropTypes from "prop-types";
import React from "react";

import styles from "./ListItem.module.css";

const ListItem = ({ children, className, component: Component, ...other }) => (
  <Component
    className={[styles.ListItem, className].join(" ").trim()}
    {...other}
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
