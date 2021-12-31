import "./Button.css";

const variants = {
  none: "none",
  filled: "filled",
  outline: "outline",
};

const colors = {
  primary: "var(--color-primary)",
  success: "var(--color-success)",
  danger: "var(--color-danger)",
  light: "var(--color-light)",
  dark: "var(--color-dark)",
};

const Button = ({ className, children, ...props }) => {
  const variant = variants[props.variant ?? "none"];
  const color = colors[props.color ?? "primary"];

  return (
    <button
      {...props}
      className={`Button ${className}`}
      data-variant={variant}
      style={{ "--color": color }}
    >
      {children}
    </button>
  );
};

export default Button;
