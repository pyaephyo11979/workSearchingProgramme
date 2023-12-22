import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";

import SpinnerFullPage from "./SpinnerFullPage";

function AppLayout() {
    const navigation = useNavigation();
    console.log(navigation);

    return (
        <>
            <header>
                <Navbar />
            </header>

            <main>
                {navigation.state === "submitting" && <SpinnerFullPage />}
                {navigation.state === "loading" && <SpinnerFullPage />}
                {navigation.state === "idle" && <Outlet />}
            </main>
        </>
    );
}

export default AppLayout;
