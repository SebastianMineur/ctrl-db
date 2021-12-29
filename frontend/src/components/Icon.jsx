import "./Icon";

const Icon = ({ icon, size = "1em" }) => {
  return (
    <svg className="Icon" viewBox="0 0 24 24" width={size} height={size}>
      <path fill="currentColor" d={icon} />
    </svg>
  );
};

export default Icon;
