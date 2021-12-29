import "./Button.css";

const Button = (props) => {
  const variant = props.variant;

  return (
    <button
      className={`Button ${props.className}`}
      data-variant={variant}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
