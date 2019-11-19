import PropTypes from "prop-types";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useRef
} from "react";

import styles from "./constants";

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
  stickTo: to
}) => {
  const ref = useRef();
  const [stickTo, setStickTo] = useState({});

  const handleScroll = useCallback(() => {
    const scroll = () => {
      if (
        ["all", "top"].includes(to) &&
        listRef.current.scrollTop + getStickedHeadersTotalHeight(0, index) >=
          ref.current.initialOffsetTop
      ) {
        ref.current.nextElementSibling.style.marginTop = `${
          ref.current.getBoundingClientRect().height
        }px`;
        setStickTo({
          styles: {
            position: "absolute",
            top: `${getStickedHeadersTotalHeight(0, index)}px`
          }
        });
      } else if (
        ["all", "bottom"].includes(to) &&
        listRef.current.scrollTop +
          (listRef.current.offsetHeight -
            getStickedHeadersTotalHeight(index, getTotalHeaders())) <
          ref.current.initialOffsetTop
      ) {
        if (ref.current.style.bottom) {
          return;
        }

        ref.current.nextElementSibling.style.marginTop = 0;

        setStickTo({
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
        setStickTo({});
      }
    };
    const rafId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(rafId);
  }, [getStickedHeadersTotalHeight, getTotalHeaders, index, listRef, to]);

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
        ...stickTo.styles
      }}
    >
      {children}
    </Component>
  );
};

ListHeader.propTypes = {
  addHeader: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.string,
  getStickedHeadersTotalHeight: PropTypes.func,
  getTotalHeaders: PropTypes.func,
  index: PropTypes.number,
  listRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  ready: PropTypes.bool,
  stickTo: "all"
};

ListHeader.defaultProps = {
  /** Add current header to the stack of list headers */
  addHeader: () => {},
  /** List items */
  children: [],
  /** Optional class name for the list component */
  className: "",
  /** Default HTML tag name for the list item */
  component: "li",
  /** Calculate the total height of specified range of headers in the stack */
  getStickedHeadersTotalHeight: () => {},
  /** Get total amount of headers in stack */
  getTotalHeaders: () => {},
  index: 0,
  listRef: null,
  ready: false,
  stickTo: PropTypes.oneOf(["all", "bottom", "top"])
};

export default ListHeader;
