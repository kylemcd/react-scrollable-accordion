import PropTypes from "prop-types";
import React, { useRef, useState } from "react";

import ListHeader from "./ListHeader";
import styles from "./constants";

/**
 * The list with scrolling and a wrapper
 *
 * @param {({
 *  children: [Node] | Node,
 *  className?: string,
 *  component?: string,
 *  label?: string,
 *  scrollBehavior?: "auto" | "smooth",
 *  stickyHeaders?: boolean,
 *  stickTo?: "all" | "bottom" | "top",
 * })} props
 */
const List = ({
  children,
  className,
  component: Component,
  label,
  scrollBehavior,
  stickyHeaders,
  stickTo
}) => {
  const listRef = useRef();
  let index = 0;
  const headers = [];
  const [ready, setReady] = useState(false);

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

  const addHeader = ref => {
    headers.push(ref);
    if (index === headers.length) {
      // ugly, but helps to deal with SSR glitches in Safari
      setTimeout(() => setReady(true), 200);
    }
  };

  const getTotalHeaders = () => headers.length;

  const nodes = stickyHeaders
    ? React.Children.map(children, child => {
        if (child && child.type === ListHeader) {
          const header = React.cloneElement(child, {
            addHeader,
            getStickedHeadersTotalHeight,
            getTotalHeaders,
            index,
            listRef,
            ready,
            stickTo
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string,
  component: PropTypes.string,
  label: PropTypes.string,
  scrollBehavior: PropTypes.oneOf(["auto", "smooth"]),
  stickyHeaders: PropTypes.bool,
  stickTo: PropTypes.oneOf(["all", "bottom", "top"])
};

List.defaultProps = {
  /** Optional class name for the list component */
  className: "",
  /** Default HTML tag name for the list */
  component: "ul",
  /** Optional ARIA label value */
  label: "",
  /** Sets the behavior for a scrolling box ("auto", "smooth") */
  scrollBehavior: "auto",
  /** Whether the header items should stick to top/bottom edges of the list */
  stickyHeaders: false,
  /** Whether headers shouhld stick to bottom/top only, or to both sides */
  stickTo: "all"
};

export default List;
