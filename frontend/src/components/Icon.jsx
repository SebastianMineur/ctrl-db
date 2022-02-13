import css from "./css/Icon.module.css";

const Icon = ({ icon, size = "1em" }) => {
  return (
    <svg className={css.Icon} viewBox="0 0 24 24" width={size} height={size}>
      <path fill="currentColor" d={icon} />
    </svg>
  );
};

export default Icon;
