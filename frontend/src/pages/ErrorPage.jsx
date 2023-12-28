import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();

    // default errors
    let title = "Sorry, an unexpected error has occurred.";
    let message = "error";
 
    if (error.status === 500) {
        message = error.data.message;
    }

    if (error.status === 404) {
        title = "Not Found!";
        message = "Could not find resources or page";
    }
    return (
        <div className="h-screen bg-zinc-900 flex justify-center items-center">
    
            <div className="text-stone-100 bg-zinc-700 w-[90%] p-10">
                <p className="my-6">{title}</p>
                <p>
                    <i className="text-red-500">{message}</i>
                </p>

                <button
                    className="text-blue-500 my-6 rounded font-bold"
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}
