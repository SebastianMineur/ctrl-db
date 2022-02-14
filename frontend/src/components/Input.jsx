import React from "react";
import * as cls from "classnames";
import css from "./css/Input.module.css";

const Input = React.forwardRef(({ className, error, ...props }, ref) => {
  return (
    <>
      <input
        className={cls(css.Input, error && css.error, className)}
        {...props}
        ref={ref}
      />
      {error && <p className="font-bold col-danger mt-05 mb-0">{error}</p>}
    </>
  );
});

export default Input;
