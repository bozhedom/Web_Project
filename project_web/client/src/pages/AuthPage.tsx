import React, {useState} from "react";
import Button from "@mui/material/Button";
import {Login} from "../components/Login";
import {Registration} from "../components/Registration";

export function AuthPage() {
    const [login, setLogin] = useState(true)

    return (
        <>
            <div>
                {login ? <Login /> : <Registration />}

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, ml: 83 }}
                    onClick={() => setLogin(!login)}
                >
                    {login ? 'Зарегистрироватся': 'Войти'}
                </Button>

            </div>
        </>
    )
}