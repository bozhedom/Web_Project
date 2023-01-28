import {useContext, useEffect, useState} from "react";
import {AppContext, AppContextProvider} from "../contexts/AppContext";
import {BottomNavigation, Container, Grid} from "@mui/material";
import * as React from 'react';
import {NavBar} from "../pages/NavBar"
import Typography from "@mui/material/Typography";
import {ProfileInfo} from "../objects/ProfileInfo";
import Box from "@mui/material/Box";
import {profileRepository} from "../repositories/ProfileRepository";

export const Profile = (props: any) => {

    const [profile, setProfile] = useState<ProfileInfo>();

    useEffect(() => {
        profileRepository
            .getProfile()
            .then((data) => {
                setProfile(data);
            })
    }, []);



    return (
        <>
            <NavBar></NavBar>
            <Box sx={{
                width: 300,
                height: 300
            }}>
                <Typography component="h1" variant="h5">
                    {profile?.userName ?? "..."}
                </Typography>
                <Typography component="h4" variant="h6" margin={1} padding={2}>
                    Интересы: {profile?.userProfile?.interests}
                </Typography>
                <Typography component="h4" variant="h6" margin={1} padding={2}>
                    Знания: {profile?.userProfile?.knowledge}
                </Typography>
                <Typography component="h4" variant="h6" margin={1} padding={2}>
                    Описания: {profile?.userProfile?.hobby}
                </Typography>
            </Box>
        </>
    )
}
