import {useContext, useEffect, useState} from "react";
import {AppContext, AppContextProvider} from "../contexts/AppContext";
import {
    BottomNavigation,
    Container,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Stack,
    RadioGroup,
    Radio,
    Checkbox, FormGroup
} from "@mui/material";
import * as React from 'react';
import {NavBar} from "../pages/NavBar"
import Typography from "@mui/material/Typography";
import {ProfileInfo} from "../objects/ProfileInfo";
import Box from "@mui/material/Box";
import {profileRepository} from "../repositories/ProfileRepository";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FaceIcon from '@mui/icons-material/Face';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import {ProfileInput} from "../objects/ProfileInput";

export const Profile = (props: any) => {

    const [profile, setProfile] = useState<ProfileInfo>();
    const [open, setOpen] = React.useState(false);
    const {changePage} = useContext(AppContext)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        profileRepository
            .getProfile()
            .then((data) => {
                setProfile(data);
            })
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            interests: data.get('interests'),
            knowledge: data.get('knowledge'),
            hobby: data.get('hobby'),
            mentor: data.get('mentor'),
            student: data.get('student'),
            searchStudent: data.get('searchStudent')
        });

        const profileInput: ProfileInput = {
            hobby: data.get("hobby")?.toString() ?? "",
            interests: data.get('interests')?.toString() ?? "",
            knowledge: data.get('knowledge')?.toString() ?? "",
            searchStudent: data.get('searchStudent') != null,
            mentor: data.get('mentor') != null,
            student: data.get('student') != null

        };
        profileRepository
            .updateProfile(profileInput)
            .finally(() => {
                window.location.reload();
            });
    };


    return (
        <>
            <NavBar></NavBar>
            <Box sx={{
                width: 300,
                height: 300
            }}>
                <Stack direction="row" spacing={2} padding={2} margin={3}>

                    {(profile?.userProfile?.mentor ?? false) && <Grid spacing={3}><PersonSearchIcon/></Grid>}
                    {(profile?.userProfile?.student ?? false) && <Grid spacing={3}><FaceIcon/></Grid>}
                    {(profile?.userProfile?.searchStudent ?? false) && <Grid spacing={3}><ManageSearchIcon/></Grid>}

                </Stack>

                <Typography component="h1" variant="h5" margin={1} padding={2}>
                    Имя пользователя: {profile?.userName ?? "..."}
                </Typography>
                <Typography component="h4" variant="h6" margin={1} padding={2}>
                    Интересы: {profile?.userProfile?.interests}
                </Typography>
                <Typography component="h4" variant="h6" margin={1} padding={2}>
                    Знания: {profile?.userProfile?.knowledge}
                </Typography>
                <Typography component="h4" variant="h6" margin={1} padding={2}>
                    Хобби: {profile?.userProfile?.hobby}
                </Typography>

                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Изменить данные
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <DialogTitle id="form-dialog-title">Изменить данные</DialogTitle>
                        <DialogContent>
                            <FormGroup>
                                <FormControlLabel value="Ментор" key="Ментор" control={<Checkbox
                                    defaultChecked={(profile?.userProfile?.mentor === true)} id="mentor"
                                    name="mentor"/>} label="Ментор"/>
                                <FormControlLabel value="Обучающийся" key="Обучающийся" control={<Checkbox
                                    defaultChecked={(profile?.userProfile?.student === true)} id="student"
                                    name="student"/>} label="Обучающийся"/>
                                <FormControlLabel value="Поиск студента" key="Поиск студента" control={<Checkbox
                                    defaultChecked={(profile?.userProfile?.searchStudent === true)} id="searchStudent"
                                    name="searchStudent"/>} label="Поиск студента"/>
                            </FormGroup>

                            <Box>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    id="interests"
                                    name="interests"
                                    label="Интересы"
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="knowledge"
                                    name="knowledge"
                                    label="Знания"
                                    variant="standard"
                                    fullWidth
                                    type="text"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    fullWidth
                                    id="hobby"
                                    name="hobby"
                                    label="Хобби"
                                    variant="standard"
                                    type="text"
                                />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Выйти
                            </Button>
                            <Button type="submit" color="primary">
                                Изменить
                            </Button>
                        </DialogActions>
                    </Box>
                </Dialog>

            </Box>
        </>
    )
}
