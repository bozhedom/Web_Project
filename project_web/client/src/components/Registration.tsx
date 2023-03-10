import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useContext, useState} from "react";
import {AppContext} from "../contexts/AppContext";
import {AuthInput} from "../objects/AuthInput";
import {AuthInfo} from "../objects/AuthInfo";

const theme = createTheme();

export function Registration() {
    const {registration, changePage} = useContext(AppContext)

    const inputLogin: React.RefObject<HTMLInputElement> = React.createRef();
    const inputPassword: React.RefObject<HTMLInputElement> = React.createRef();

    const handleSignup = () => {
        const registrationInput: AuthInput = {
            login: inputLogin.current?.value ?? "",
            password: inputPassword.current?.value ?? ""
        }

        console.log(registrationInput);

        registration(registrationInput)
            .then((data) => {
                if(data.isAuthenticated){
                    changePage("Home"   )
                }
            });
    }

    return (
        <>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        ??????????????????????????????????
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="login"
                                    label="??????????"
                                    name="login"
                                    inputRef={inputLogin}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="????????????"
                                    type="password"
                                    id="password"
                                    inputRef={inputPassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="?? ???????????????? ?????????????? ???????????????????????? ?????????? ??????????"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            onClick={handleSignup}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            ??????????????????????????????????
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" >
                                    ?? ?????? ?????? ???????? ??????????????? ??????????
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </>
    );
}