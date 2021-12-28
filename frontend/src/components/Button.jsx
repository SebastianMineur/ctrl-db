const variants = {
  none: "bg-none",
  filled: "col-black",
  outline: "b-1",
};

const Button = (props) => {
  const variant = props.variant || "none";

  return (
    <button className={`${props.className} ${variants[variant]}`}>
      {props.children}
    </button>
  );
};

export default Button;
