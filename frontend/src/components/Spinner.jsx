import "./css/Spinner.css";

const Spinner = ({ size = "1em" }) => {
  return <span style={{ "--size": size }} className="Spinner"></span>;
};

export default Spinner;
