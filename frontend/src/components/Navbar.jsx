import { useEffect, useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";

function Navbar() {
    const user = useLoaderData("root");

    const [userData, setUserData] = useState(user);

    useEffect(() => {
        setUserData(user);
    }, [user]);

    function logout() {
        localStorage.clear();
        setUserData(null);
    }

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

                {userData === null && (
                    <NavLink to="/login">
                        <li>Login</li>
                    </NavLink>
                )}

                {userData && <button onClick={logout}>Logout</button>}
                {userData && <NavLink>Profile</NavLink>}
            </ul>
        </nav>
    );
}

export default Navbar;
