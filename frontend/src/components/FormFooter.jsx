/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function FormFooter({ label }) {
    return (
        <div className="flex justify-between md:justify-end items-center">
            <button className="px-6 py-2 bg-emerald-600 rounded text-white">
                {label}
            </button>

            {label === "login" ? (
                <small className="text-white text-center text-xs w-2/3 md:w-1/2">
                    Don&apos;t have account?{" "}
                    <Link className="text-blue-500" to="/register">
                        Register
                    </Link>
                </small>
            ) : (
                <small className="text-white text-center text-xs w-2/3 md:w-1/2">
                    already have an account?{" "}
                    <Link className="text-blue-500" to="/login">
                        Login
                    </Link>
                </small>
            )}
        </div>
    );
}

export default FormFooter;
