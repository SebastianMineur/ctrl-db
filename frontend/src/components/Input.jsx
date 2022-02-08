import "./css/Input.css";

const Input = ({ className, error, ...props }) => {
  return (
    <>
      <input
        className={`Input ${error ? "error" : ""} ${className || ""}`}
        {...props}
      ></input>
      {error && <p className="font-bold col-danger mt-05 mb-0">{error}</p>}
    </>
  );
};

export default Input;
