import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState, useRef } from "react";

import styles from "./ListItem.module.css";

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
        listRef.current.scrollTop + getStickedHeadersTotalHeight(0, index) >=
        ref.current.initialOffsetTop
      ) {
        ref.current.nextElementSibling.style.marginTop = ref.current.getBoundingClientRect().height;
        setStickTo({
          className: "sticky",
          styles: {
            top: getStickedHeadersTotalHeight(0, index)
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
          className: "sticky",
          styles: {
            bottom: getStickedHeadersTotalHeight(index + 1, getTotalHeaders())
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
      getStickedHeadersTotalHeight(0, index) -
      (getComputedStyle(listRef.current).scrollBehavior === "auto"
        ? getStickedHeadersTotalHeight(0, index, true)
        : 0);
  };

  useEffect(() => {
    if (listRef) {
      addHeader(ref);
      ref.current.initialOffsetTop = ref.current.offsetTop;
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
      className={[styles.ListHeader, className, styles[stickTo.className]]
        .join(" ")
        .trim()}
      ref={ref}
      onClick={scrollTo}
      style={stickTo.styles}
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
  listRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
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
