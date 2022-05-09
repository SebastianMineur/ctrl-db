import { useState } from "react";
import { Link } from "react-router-dom";
import cls from "classnames";

import Button from "../../components/Button";
import Icon from "../../components/Icon";
import Navmenu from "./Navmenu";

import { useAuthContext } from "../../contexts/AuthContext";
import { menu, menuOpen } from "../../assets/icons";
import css from "./css/Navbar.module.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { currentUser } = useAuthContext();

  return (
    <header className={cls(css.Navbar, "py-2 px-1")}>
      <div className="flex align-center justify-between">
        <Link to="/" className={css.header}>
          <h1 className="">Ctrl DB</h1>
        </Link>

        <div className="flex align-center gap-1">
          {currentUser && <span>{currentUser.username}</span>}

          <Button className="col-white" onClick={() => setShowMenu(true)}>
            <Icon icon={showMenu ? menuOpen : menu} size="2rem" />
          </Button>
        </div>
      </div>

      {showMenu && <Navmenu onClose={() => setShowMenu(false)} />}
    </header>
  );
};

export default Navbar;
