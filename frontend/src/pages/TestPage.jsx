import Icon from "../components/Icon";
import * as cls from "classnames";

import * as icons from "../assets/icons";
import css from "./css/TestPage.module.css";

const TestPage = () => {
  return (
    <div className={cls(css.TestPage, "container-lg grid column gap-2")}>
      <div className="color-grid">
        {/* Row 1 */}
        <div>
          <div className="inner bg-none" />
        </div>
        <div>
          <div className="inner bg-white" />
        </div>
        <div>
          <div className="inner bg-black" />
        </div>
        <div>
          <div className="inner bg-primary" />
        </div>
        <div>
          <div className="inner bg-light" />
        </div>
        <div>
          <div className="inner bg-dark" />
        </div>
        <div>
          <div className="inner bg-danger" />
        </div>
        <div>
          <div className="inner bg-warning" />
        </div>
        <div>
          <div className="inner bg-success" />
        </div>
        <div>
          <div className="inner bg-info" />
        </div>

        {/* Row 2 */}
        <div className="bg-none">
          <div className="inner current col-none" />
        </div>
        <div className="bg-white">
          <div className="inner current col-white" />
        </div>
        <div className="bg-black">
          <div className="inner current col-black" />
        </div>
        <div className="bg-primary">
          <div className="inner current col-primary" />
        </div>
        <div className="bg-light">
          <div className="inner current col-light" />
        </div>
        <div className="bg-dark">
          <div className="inner current col-dark" />
        </div>
        <div className="bg-danger">
          <div className="inner current col-danger" />
        </div>
        <div className="bg-warning">
          <div className="inner current col-warning" />
        </div>
        <div className="bg-success">
          <div className="inner current col-success" />
        </div>
        <div className="bg-info">
          <div className="inner current col-info" />
        </div>

        {/* Row 3 */}
        <div>
          <div className="inner current col-none" />
        </div>
        <div>
          <div className="inner current col-white" />
        </div>
        <div>
          <div className="inner current col-black" />
        </div>
        <div>
          <div className="inner current col-primary" />
        </div>
        <div>
          <div className="inner current col-light" />
        </div>
        <div>
          <div className="inner current col-dark" />
        </div>
        <div>
          <div className="inner current col-danger" />
        </div>
        <div>
          <div className="inner current col-warning" />
        </div>
        <div>
          <div className="inner current col-success" />
        </div>
        <div>
          <div className="inner current col-info" />
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {Object.entries(icons).map(([key, value]) => (
          <Icon key={key} icon={value} size="2rem" />
        ))}
      </div>
    </div>
  );
};

export default TestPage;
