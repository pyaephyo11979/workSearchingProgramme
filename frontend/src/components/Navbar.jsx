import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex justify-between p-5">
            <div className="w-1/3">Logo</div>
            <ul className="flex justify-around w-2/3">
                <NavLink to="/">
                    <li>Home</li>
                </NavLink>
                <NavLink to="/jobs">
                    <li>Jobs</li>
                </NavLink>
                <NavLink to="/login">
                    <li>Login</li>
                </NavLink>
            </ul>
        </nav>
    );
}

export default Navbar;
