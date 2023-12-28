import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import { checkAuthUser } from "../utils/loaders";

function LoginPage() {
    const currentUser = checkAuthUser("root");
    const navigate = useNavigate();
    
    useEffect(() => {
        if (currentUser) {
            navigate(`/profile/${currentUser._id}`)
        }
    }, [currentUser, navigate])

    return <LoginForm />;
}

export default LoginPage;
