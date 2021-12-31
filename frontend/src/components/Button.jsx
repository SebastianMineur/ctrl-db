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

const Button = (props) => {
  const variant = variants[props.variant ?? "none"];
  const color = colors[props.color ?? "primary"];

  return (
    <button
      className={`Button ${props.className}`}
      data-variant={variant}
      onClick={props.onClick}
      style={{ "--color": color }}
    >
      {props.children}
    </button>
  );
};

export default Button;
