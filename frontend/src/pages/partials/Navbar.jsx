import { NavLink } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
    return (
        <header className="Navbar">
            <h1 className="logo">Ctrl DB</h1>

            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="about">About</NavLink>
            </nav>
        </header>
    );
}

export default Navbar;