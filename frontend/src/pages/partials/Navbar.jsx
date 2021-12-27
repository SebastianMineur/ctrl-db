import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="bg-white shadow-lg p-1">
            <div className="container-lg flex align-center justify-between">
                <h1 className="font-lg m-0">Ctrl DB</h1>

                <nav className="flex gap-1">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="about">About</NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;