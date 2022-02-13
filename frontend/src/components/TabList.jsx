import React from "react";
import * as cls from "classnames";
import css from "./css/TabList.module.css";

const TabList = ({ children, activeIndex, ...props }) => {
  return (
    <ul className={css.TabList} {...props}>
      {React.Children.map(children, (child, index) => (
        <li
          key={index}
          className={cls(
            index == activeIndex && "bg-white",
            "inline-flex b-1 bb-0"
          )}
        >
          {child}
        </li>
      ))}
    </ul>
  );
};

export default TabList;
