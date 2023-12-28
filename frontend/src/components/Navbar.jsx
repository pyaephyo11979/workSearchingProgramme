import { useEffect, useState } from "react";
import { Link, NavLink, useLoaderData, useNavigate } from "react-router-dom";

function Navbar() {
    const user = useLoaderData("root");

    const [userData, setUserData] = useState(user);
    
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setUserData(user);
    }, [user]);

    function logout() {
        localStorage.clear();
        setUserData(null);
        navigate('/login')
    }

    useEffect(() => {
        document.addEventListener("click", function (event) {
            if (event.target.innerHTML !== "Profile")
                setIsProfileMenuOpen(false);
        });
    }, []);

    function activeHandler({ isActive }) {
        return isActive ? "text-amber-500" : "";
    }

    return (
        <nav className="flex justify-between p-5">
            <div className="w-1/3">Logo</div>
            <ul className="flex justify-around w-2/3">
                <NavLink to="/" className={activeHandler}>
                    <li>Home</li>
                </NavLink>

                <NavLink to="/jobs" className={activeHandler}>
                    <li>Jobs</li>
                </NavLink>

                {userData === null ? (
                    <NavLink to="/login" className={activeHandler}>
                        <li>Login</li>
                    </NavLink>
                ) : (
                    <div className="relative w-1/3">
                        <button onClick={() => setIsProfileMenuOpen((p) => !p)}>
                            Profile
                        </button>

                        {isProfileMenuOpen && (
                            <ul className="absolute flex flex-col gap-3 p-10 text-sm bg-black -left-[50%] w-[10rem] md:-left-[20%]">
                                <Link
                                    to={`/profile/${userData._id}`}
                                    className="hover:text-amber-500"
                                >
                                    {userData.name}
                                </Link>
                                {   userData.role !== "user" && <Link
                                        to="/createjob"
                                        className="hover:text-amber-500"
                                    >
                                        Create Jobs
                                    </Link>
                                }
                                {userData && (
                                    <li className="hover:text-amber-500">
                                        <button onClick={logout}>Logout</button>
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
