import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import * as cls from "classnames";

import Button from "../../components/Button";
import Icon from "../../components/Icon";

import { useAuthContext } from "../../contexts/AuthContext";
import { home, login, plus } from "../../assets/icons";
import css from "./css/Navmenu.module.css";

const Navmenu = ({ onClose }) => {
  const { currentUser, logout } = useAuthContext();
  const navRef = useRef();

  useEffect(() => {
    const clickListener = (e) => {
      if (
        !navRef.current.contains(e.target) ||
        e.target.tagName == "A" ||
        e.target.tagName == "BUTTON"
      ) {
        if (typeof onClose === "function") onClose();
      }
    };
    addEventListener("click", clickListener);
    return () => {
      removeEventListener("click", clickListener);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={cls(
        css.Navmenu,
        "flex column gap-1 bg-white p-1 rounded shadow-lg"
      )}
    >
      <NavLink to="/">
        Home
        <Icon icon={home} size="1.25em" />
      </NavLink>

      {currentUser && (
        <NavLink to="device">
          Create device
          <Icon icon={plus} size="1.25em" />
        </NavLink>
      )}

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
