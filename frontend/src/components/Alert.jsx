import Icon from "./Icon";
import colors from "../util/colors";
import css from "./css/Alert.module.css";

const Alert = ({ icon, color = "info", children, style, ...props }) => {
  return (
    <div
      class={css.Alert}
      style={{ "--color": colors[color], ...style }}
      {...props}
    >
      {icon && <Icon icon={icon} size="2rem" />}
      <div class="text-left">{children}</div>
    </div>
  );
};

export default Alert;
