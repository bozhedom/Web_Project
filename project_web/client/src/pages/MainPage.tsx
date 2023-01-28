import Button from "@mui/material/Button";
import {useContext, useEffect, useState} from "react";
import {ProfileInfo} from "../objects/ProfileInfo";
import {ProfileInput} from "../objects/ProfileInput";
import {profileRepository} from "../repositories/ProfileRepository";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {AppContext} from "../contexts/AppContext";
import React from "react";
import {BottomNavigation, BottomNavigationAction, Box, SwipeableDrawer} from "@mui/material";
import {NavBar} from "../pages/NavBar"
export function MainPage() {

    return (
        <>
            <NavBar></NavBar>
            <Box sx={{display: 'flex'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', ml: 25,
                    left: '50%',
                    top: '50%'}}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{mb: 10, mt: 20}}
                    >
                        Найти ментора
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{}}
                    >
                        Найти ученика
                    </Button>
                </Box>
            </Box>
        </>
    )
}