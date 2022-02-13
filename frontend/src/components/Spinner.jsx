import css from "./css/Spinner.module.css";

const Spinner = ({ size = "1em" }) => {
  return <span style={{ "--size": size }} className={css.Spinner}></span>;
};

export default Spinner;
