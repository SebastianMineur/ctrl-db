import { NavLink } from "react-router-dom";
import Icon from "../../components/Icon";
import { home } from "../../assets/icons";
import "./Navmenu.css";

const Navmenu = () => {
  return (
    <nav className="Navmenu flex column gap-1 bg-white p-1 rounded shadow-lg">
      <NavLink to="/" className="Navlink">
        Home
        <Icon icon={home} />
      </NavLink>

      <NavLink to="device" className="Navlink">
        Device
        <Icon icon={home} />
      </NavLink>

      <NavLink to="login" className="Navlink">
        Log in
        <Icon icon={home} />
      </NavLink>
    </nav>
  );
};

export default Navmenu;
