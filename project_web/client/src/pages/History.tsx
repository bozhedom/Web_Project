import {useContext} from "react";
import {AppContext, AppContextProvider} from "../contexts/AppContext";
import {BottomNavigation, Container, Grid} from "@mui/material";
import * as React from 'react';
import {NavBar} from "../pages/NavBar"

export const History = (props: any) => {

    return (
        <>
            <NavBar></NavBar>
            <h1>История</h1>
        </>
    )
}
