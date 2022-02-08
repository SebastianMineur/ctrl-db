import { useState } from "react";

import Button from "../../components/Button";
import Icon from "../../components/Icon";
import Navmenu from "./Navmenu";

import { useAuthContext } from "../../contexts/AuthContext";
import { menu, menuOpen } from "../../assets/icons";
import "./css/Navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { currentUser } = useAuthContext();

  return (
    <header className="Navbar py-2 px-1">
      <div className="flex align-center justify-between">
        <h1 className="font-lg m-0">Ctrl DB</h1>

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
