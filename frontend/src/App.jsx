import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobDetails from "./components/JobDetails";
import JobContextProvider from "./ctx/JobContext";

import { registerAction, loginAction } from "./utils/actions";
import { checkAuthUser } from "./utils/loaders";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            loader: checkAuthUser,
            id: "root",
            element: <AppLayout />,

            children: [
                { index: true, element: <HomePage /> },
                {
                    path: "jobs",
                    element: (
                        <JobContextProvider>
                            <JobsPage />
                        </JobContextProvider>
                    ),
                },
                { path: "jobs/:id", element: <JobDetails /> },
                {
                    path: "register",
                    element: <RegisterPage />,
                    action: registerAction,
                },
                {
                    path: "login",
                    element: <LoginPage />,
                    action: loginAction,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
