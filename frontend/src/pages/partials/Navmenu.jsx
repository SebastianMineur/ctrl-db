import { NavLink } from "react-router-dom";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import { home, login, plus } from "../../assets/icons";
import "./Navmenu.css";
import { useAuthContext } from "../../contexts/AuthContext";

const Navmenu = () => {
  const { currentUser, logout } = useAuthContext();

  return (
    <nav className="Navmenu flex column gap-1 bg-white p-1 rounded shadow-lg">
      <NavLink to="/">
        Home
        <Icon icon={home} size="1.25em" />
      </NavLink>

      <NavLink to="device">
        Create device
        <Icon icon={plus} size="1.25em" />
      </NavLink>

      <hr />

      {currentUser ? (
        <Button onClick={logout}>
          Log out
          <Icon icon={login} size="1.25em" />
        </Button>
      ) : (
        <NavLink to="login">
          Log in
          <Icon icon={login} size="1.25em" />
        </NavLink>
      )}
    </nav>
  );
};

export default Navmenu;
