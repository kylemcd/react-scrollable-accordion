import PropTypes from "prop-types";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useRef
} from "react";

import styles from "./constants";

/**
 * ListHeader is an optionally sticky list element
 * @param {({
 *  children?: [React.ReactNode] | React.ReactNode,
 *  className?: string,
 *  component?: string,
 *  stickTo?: "all" | "bottom" | "top",
 * })} props
 *
 * @returns {React.ReactNode}
 */
const ListHeader = ({
  addHeader,
  children,
  className,
  component: Component,
  getStickedHeadersTotalHeight,
  getTotalHeaders,
  index,
  listRef,
  ready,
  stickTo
}) => {
  const ref = useRef();
  const [stickAt, setStickAt] = useState({});

  const handleScroll = useCallback(() => {
    const scroll = () => {
      if (
        ["all", "top"].includes(stickTo) &&
        listRef.current.scrollTop + getStickedHeadersTotalHeight(0, index) >=
          ref.current.initialOffsetTop
      ) {
        ref.current.nextElementSibling.style.marginTop = `${
          ref.current.getBoundingClientRect().height
        }px`;
        setStickAt({
          styles: {
            position: "absolute",
            top: `${getStickedHeadersTotalHeight(0, index)}px`
          }
        });
      } else if (
        ["all", "bottom"].includes(stickTo) &&
        listRef.current.scrollTop +
          (listRef.current.offsetHeight -
            getStickedHeadersTotalHeight(index, getTotalHeaders())) <
          ref.current.initialOffsetTop
      ) {
        if (ref.current.style.bottom) {
          return;
        }

        ref.current.nextElementSibling.style.marginTop = 0;

        setStickAt({
          styles: {
            bottom: `${getStickedHeadersTotalHeight(
              index + 1,
              getTotalHeaders()
            )}px`,
            position: "absolute"
          }
        });
      } else if (ref.current.style.bottom || ref.current.style.top) {
        ref.current.nextElementSibling.style.marginTop = 0;
        setStickAt({});
      }
    };
    const rafId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(rafId);
  }, [getStickedHeadersTotalHeight, getTotalHeaders, index, listRef, stickTo]);

  const scrollTo = () => {
    const list = listRef.current;
    list.scrollTop =
      ref.current.initialOffsetTop - getStickedHeadersTotalHeight(0, index);
  };

  useLayoutEffect(() => {
    if (listRef && ref.current) {
      addHeader(ref);

      if (ready) {
        ref.current.initialOffsetTop = ref.current.offsetTop;
        handleScroll();
      }
    }
  }, [addHeader, handleScroll, listRef, ready]);

  useEffect(() => {
    if (listRef) {
      const list = listRef.current;
      list.addEventListener("scroll", handleScroll);
      return () => list.removeEventListener("scroll", handleScroll);
    }

    return () => {};
  }, [handleScroll, listRef]);

  return (
    <Component
      aria-level="1"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(className ? { className } : {})}
      ref={ref}
      onClick={scrollTo}
      role="listitem"
      style={{
        ...styles.ListHeader,
        ...stickAt.styles
      }}
    >
      {children}
    </Component>
  );
};

ListHeader.propTypes = {
  /** Add current header to the stack of list headers */
  addHeader: PropTypes.func,
  /** List header children */
  children: PropTypes.node,
  /** Optional class name for the ListHeader component */
  className: PropTypes.string,
  /** Default HTML tag name for the ListHeader component */
  component: PropTypes.string,
  /** Calculate the total height of specified range of headers in the stack */
  getStickedHeadersTotalHeight: PropTypes.func,
  /** Get total amount of headers in stack */
  getTotalHeaders: PropTypes.func,
  /** Current index of ListHeader in the stack */
  index: PropTypes.number,
  /** Reference to the List component */
  listRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  /** Indicator that all headers finished DOM mutations */
  ready: PropTypes.bool,
  /** Whether headers should stick to bottom/top only, or to both sides */
  stickTo: PropTypes.oneOf(["all", "bottom", "top"])
};

ListHeader.defaultProps = {
  addHeader: () => {},
  children: [],
  className: "",
  component: "li",
  getStickedHeadersTotalHeight: () => {},
  getTotalHeaders: () => {},
  index: 0,
  listRef: null,
  ready: false,
  stickTo: "all"
};

export default ListHeader;
