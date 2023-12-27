import { useLoaderData } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function LoginPage() {
    const currentUser = useLoaderData("root");
    console.log(currentUser)
    return <LoginForm />;
}

export default LoginPage;
