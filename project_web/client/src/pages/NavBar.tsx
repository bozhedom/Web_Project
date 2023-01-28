import {useContext} from "react";
import {AppContext, AppContextProvider} from "../contexts/AppContext";
import {BottomNavigation, BottomNavigationAction, Container, Grid} from "@mui/material";
import * as React from 'react';
import Box from "@mui/material/Box";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HistoryIcon from "@mui/icons-material/History";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";

export const NavBar = (props: any) => {
    const {userName, isAuthenticated, role, page, changePage, logout} = useContext(AppContext);

    const handleClick = (page:string) => {
        // let target = event?.target as HTMLButtonElement;
        // let tmp = target?.value
        // console.log(event)
        changePage(page)
    }

    const onLogout = () => {
        logout().then(() => {
            window.location.reload();
        });
    };
    return (
        <Box sx={{width: 500, left: '100%',
            top: '100%'}}>
            <BottomNavigation
                showLabels
                value="123"
                sx={{display: 'flex'}}
            >
                <BottomNavigationAction label="Главная" icon={<AccountBalanceIcon/>} value="History" onClick={()=>{handleClick("Home")}}/>
                <BottomNavigationAction label="История" icon={<HistoryIcon/>}
                                        value="History" onClick={()=>{handleClick("History")}}/>
                <BottomNavigationAction label="Профиль" icon={<AccountBoxIcon/>} onClick={()=>{handleClick("Profile")}}/>
                <BottomNavigationAction label="Выйти" icon={<LogoutIcon/>} onClick={onLogout}/>
            </BottomNavigation>
        </Box>
    )
}

