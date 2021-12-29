import "./Button.css";

const variants = {
  none: () => {
    return {};
  },
  filled: (color) => {
    return {
      background: color,
      outlineColor: color,
    };
  },
  outline: (color) => {
    return {
      color: color,
      borderColor: color,
      outlineColor: color,
    };
  },
};

const colors = {
  primary: "hsl(var(--color-primary))",
  success: "hsl(var(--color-success))",
  danger: "hsl(var(--color-danger))",
  light: "hsl(var(--color-light))",
  dark: "hsl(var(--color-dark))",
};

const Button = (props) => {
  const variant = props.variant ?? "none";
  const color = colors[props.color || "primary"];

  return (
    <button
      className={`Button ${props.className}`}
      data-variant={variant}
      onClick={props.onClick}
      style={variants[variant](color)}
    >
      {props.children}
    </button>
  );
};

export default Button;
