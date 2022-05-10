import React from "react";
import cls from "classnames";
import css from "./css/TabList.module.css";

const TabList = ({ children, activeIndex, ...props }) => {
  return (
    <ul className={css.TabList} {...props}>
      {React.Children.toArray(children).map((child, index) => (
        <li
          key={index}
          className={cls(css.Tab, index == activeIndex && "bg-white")}
        >
          {child}
        </li>
      ))}
    </ul>
  );
};

export default TabList;
