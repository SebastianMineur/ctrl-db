import { useState } from "react";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import { menu, menuOpen } from "../../assets/icons";
import "./Navbar.css";
import Navmenu from "./Navmenu";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState();

  return (
    <header className="Navbar py-2 px-1">
      <div className="flex align-center justify-between">
        <h1 className="font-lg m-0">Ctrl DB</h1>

        <Button className="col-white" onClick={() => setShowMenu(!showMenu)}>
          <Icon icon={showMenu ? menuOpen : menu} size="2rem" />
        </Button>
      </div>

      {showMenu && <Navmenu />}
    </header>
  );
};

export default Navbar;
