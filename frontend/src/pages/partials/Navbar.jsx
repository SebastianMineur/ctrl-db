import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="Navbar py-2 px-1">
      <div className="flex align-center justify-between">
        <h1 className="font-lg m-0">Ctrl DB</h1>

        <nav className="flex gap-1">
          <NavLink to="/" className="col-white">
            Home
          </NavLink>
          <NavLink to="device" className="col-white">
            Device
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
