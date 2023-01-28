import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Outlet} from "react-router-dom";
import {LoginRegPage} from "./pages/LoginRegPage";
import App from "./App";
import {AppContextProvider} from "./contexts/AppContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);




root.render(
    <React.StrictMode>
        <AppContextProvider>
            <App></App>
        </AppContextProvider>
    </React.StrictMode>
);
