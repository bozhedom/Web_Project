import React, {useContext} from "react";
import {LoginRegPage} from "./pages/LoginRegPage";
import {MainPage} from "./pages/MainPage";
import {NavBar} from "./pages/NavBar";
import {History} from "./pages/History";
import {Profile} from "./pages/Profile";
import {AppContext} from "./contexts/AppContext";

export default function App() {

    const {changePage, page} = useContext(AppContext);

    const pageSwitch = (page: string) => {
        switch (page) {
            case "Home":
                return <MainPage />;
            case "History":
                return <History />
            case "Profile":
                return <Profile />
            case "Login":
                return <LoginRegPage />;
            default:
                return <LoginRegPage />;
        }
    };

    return (
        <>
            {pageSwitch(page)}

        </>
    );
}