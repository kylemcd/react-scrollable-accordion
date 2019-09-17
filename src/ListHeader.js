import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState, useRef } from "react";

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
  ...other
}) => {
  const ref = useRef();
  const [stickTo, setStickTo] = useState({});

  const handleScroll = useCallback(() => {
    const scroll = () => {
      if (
        listRef.current.scrollTop +
          getStickedHeadersTotalHeight(0, index) * 2 >=
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
        listRef.current.scrollTop +
          (listRef.current.offsetHeight -
            getStickedHeadersTotalHeight(index, getTotalHeaders())) <
        ref.current.initialOffsetTop - getStickedHeadersTotalHeight(0, index)
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
  }, [getStickedHeadersTotalHeight, getTotalHeaders, index, listRef]);

  const scrollTo = () => {
    const list = listRef.current;
    list.scrollTop =
      ref.current.initialOffsetTop -
      getStickedHeadersTotalHeight(0, index) * 2 -
      (getComputedStyle(listRef.current).scrollBehavior === "auto"
        ? getStickedHeadersTotalHeight(0, index, true)
        : 0);
  };

  useEffect(() => {
    if (listRef) {
      addHeader(ref);
      ref.current.initialOffsetTop = ref.current.offsetTop;
      ref.current.nextElementSibling.style.marginTop = `${
        ref.current.getBoundingClientRect().height
      }px`;
      handleScroll();
    }
  }, [addHeader, handleScroll, listRef]);

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
      className={className}
      ref={ref}
      onClick={scrollTo}
      style={{
        ...styles.ListHeader,
        ...stickTo.styles
      }}
      {...other}
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
  ])
};

ListHeader.defaultProps = {
  addHeader: () => {},
  children: [],
  className: "",
  component: "li",
  getStickedHeadersTotalHeight: () => {},
  getTotalHeaders: () => {},
  index: 0,
  listRef: null
};

export default ListHeader;
