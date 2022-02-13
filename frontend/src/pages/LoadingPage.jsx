import Spinner from "../components/Spinner";
import * as cls from "classnames";
import css from "./css/LoadingPage.module.css";

const LoadingPage = () => {
  return (
    <div className={cls(css.LoadingPage, "col-primary")}>
      <Spinner size="100px" />
    </div>
  );
};

export default LoadingPage;
