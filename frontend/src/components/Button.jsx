import * as cls from "classnames";
import colors from "../util/colors";
import css from "./css/Button.module.css";

const variants = {
  none: "none",
  filled: "filled",
  outline: "outline",
};

const Button = ({ className, children, style, ...props }) => {
  const variant = variants[props.variant ?? "none"];
  const color = colors[props.color ?? "primary"];

  return (
    <button
      {...props}
      className={cls(css.Button, className)}
      data-variant={variant}
      style={{ "--color": color, ...style }}
    >
      {children}
    </button>
  );
};

export default Button;
