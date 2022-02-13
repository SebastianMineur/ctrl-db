import * as cls from "classnames";
import css from "./css/Button.module.css";

const variants = {
  none: "none",
  filled: "filled",
  outline: "outline",
};

const colors = {
  primary: "var(--col-primary-hsl)",
  light: "var(--col-light-hsl)",
  dark: "var(--col-dark-hsl)",
  danger: "var(--col-danger-hsl)",
  warning: "var(--col-warning-hsl)",
  success: "var(--col-success-hsl)",
  info: "var(--col-info-hsl)",
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
