import PropTypes from "prop-types";
import React, { useRef } from "react";

import ListHeader from "./ListHeader";
import styles from "./constants";

const List = ({
  children,
  className,
  component: Component,
  label,
  scrollBehavior,
  stickyHeaders
}) => {
  const listRef = useRef();
  let index = 0;
  const headers = [];

  const getStickedHeadersTotalHeight = (start, end, align) =>
    headers.slice(start, end).reduce((acc, header) => {
      if (align) {
        return (
          acc +
          (header.current.style.top
            ? 0
            : header.current.getBoundingClientRect().height)
        );
      }
      return acc + header.current.getBoundingClientRect().height;
    }, 0);

  const addHeader = ref => headers.push(ref);

  const getTotalHeaders = () => headers.length;

  const nodes = stickyHeaders
    ? React.Children.map(children, child => {
        if (child && child.type === ListHeader) {
          const header = React.cloneElement(child, {
            addHeader,
            getStickedHeadersTotalHeight,
            getTotalHeaders,
            listRef,
            index
          });

          index += 1;

          return header;
        }
        return child;
      })
    : children;

  return (
    <div style={styles.Wrapper}>
      <Component
        /* eslint-disable react/jsx-props-no-spreading */
        {...(label ? { "aria-label": label } : {})}
        {...(className ? { className } : {})}
        /* eslint-enable react/jsx-props-no-spreading */
        ref={listRef}
        role="list"
        style={{ ...styles.List, scrollBehavior }}
        tabIndex="0"
      >
        {nodes}
      </Component>
    </div>
  );
};

List.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.string,
  label: PropTypes.string,
  scrollBehavior: PropTypes.oneOf(["auto", "smooth"]),
  stickyHeaders: PropTypes.bool
};

List.defaultProps = {
  children: [],
  className: "",
  component: "ul",
  label: "",
  scrollBehavior: "auto",
  stickyHeaders: false
};

export default List;
