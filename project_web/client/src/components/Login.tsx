import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import React, { useContext, useState } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppContext } from '../contexts/AppContext'
import { useNavigate } from "react-router-dom";
import { AuthInfo } from "../objects/AuthInfo";
import { AuthInput } from "../objects/AuthInput";
import {authRepository} from "../repositories/AuthRepository";
import {MainPage} from "../pages/MainPage";
import {LoginRegPage} from "../pages/LoginRegPage";
const theme = createTheme();

export function Login() {
    const {} = useContext(AppContext);

    const inputLogin: React.RefObject<HTMLInputElement> = React.createRef();
    const inputPassword: React.RefObject<HTMLInputElement> = React.createRef();

    const {page, changePage, login} = useContext(AppContext);

    const handleLogin = (event?:React.MouseEvent<HTMLButtonElement>) => {
        let target = event?.target as HTMLButtonElement;

        const authInput: AuthInput = {
            login: inputLogin.current?.value ?? "",
            password: inputPassword.current?.value ?? ""
        }

        console.log(authInput);

        login(authInput)
            .then((data) => {
                if(data.isAuthenticated){
                    changePage("Home");
                }
            });
    }

    return (
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
                        Войти
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="Логин"
                            name="login"
                            autoComplete="login"
                            autoFocus
                            inputRef={inputLogin}/>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputRef={inputPassword}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Запомнить меня"
                        />
                        <Button
                            onClick={handleLogin}
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            value="Login"
                        >
                            Войти
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Забыли пароль?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Нет аккаунта? Зарегистрироватся"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}