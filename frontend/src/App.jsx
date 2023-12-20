import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <AppLayout />,
            children: [
                { index: true, element: <HomePage /> },
                { path: "jobs", element: <JobsPage /> },
                { path: "register", element: <RegisterPage /> },
                { path: "login", element: <LoginPage /> },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
