import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import CreateJobPage from "./pages/CreateJobPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import EditJobPage from "./pages/EditJobPage";

import JobContextProvider from "./ctx/JobContext";
import JobDetailsProvider from "./ctx/JobDetailsContext";

import { registerAction, loginAction, createJobAction } from "./utils/actions";
import { checkAuthUser, authProtectedLoader } from "./utils/loaders";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            loader: checkAuthUser,
            id: "root",
            element: <AppLayout />,

            children: [
                { index: true, element: <HomePage /> },
                { path: "jobs", element:<JobContextProvider> <JobsPage /> </JobContextProvider> },
                { path: "jobs/:id", element: <JobDetailsProvider><JobDetailsPage /></JobDetailsProvider> },
                { 
                    path: "jobs/:id/edit", 
                    element: <JobDetailsProvider>
                                <EditJobPage/>
                             </JobDetailsProvider>, 
                    action: createJobAction,
                    loader: authProtectedLoader,
                },
                { path: "createjob",element: <CreateJobPage />, action: createJobAction, loader: authProtectedLoader },
                { path: "register", element: <RegisterPage />, action: registerAction },
                { path: "login", element: <LoginPage />, action: loginAction },
                { path: "profile/:id", element:<JobContextProvider><ProfilePage /></JobContextProvider>, loader: authProtectedLoader },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
