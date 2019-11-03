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
  listRef
}) => {
  const ref = useRef();
  const [stickTo, setStickTo] = useState({});

  const handleScroll = useCallback(() => {
    const scroll = () => {
      if (
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
  }, [getStickedHeadersTotalHeight, getTotalHeaders, index, listRef]);

  const scrollTo = () => {
    const list = listRef.current;
    list.scrollTop =
      ref.current.initialOffsetTop - getStickedHeadersTotalHeight(0, index);
  };

  useEffect(() => {
    if (listRef) {
      addHeader(ref);
      setTimeout(() => {
        ref.current.initialOffsetTop = ref.current.offsetTop;
        handleScroll();
      }, 200);
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
