import { Outlet } from "react-router-dom";


import MainNavigation from "../components/MainNavigation";
import DarkModeToggle from "../components/DarkModeToggle";


function RootLayout() {
    return (
        <>
            <MainNavigation />
            <DarkModeToggle />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;