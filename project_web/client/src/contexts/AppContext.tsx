import React, { useState, useMemo, createContext, useEffect } from "react"
import RoleType from "../enums/RoleType";
import { AuthInfo }  from "../objects/AuthInfo"
import { AuthInput } from "../objects/AuthInput"
import { authRepository } from "../repositories/AuthRepository"
import {LoginRegPage} from "../pages/LoginRegPage";

interface IAppContext {
    userName: string;

    isAuthenticated: boolean;

    role: RoleType;

    page: string;

    login: (input: AuthInput) => Promise<AuthInfo>;

    registration: (input: AuthInput) => Promise<AuthInfo>;

    changePage: (page:string) => void;

    logout: () => Promise<AuthInfo>;
}

export const AppContext = createContext<IAppContext>({
    page: "",
    changePage(page: string): void {
        throw Error("Отсутствует реализация метода");
    },
    userName: "",
    isAuthenticated: false,
    role: RoleType.Undefined,
    login(input: AuthInput): Promise<AuthInfo> {
        throw Error("Отсутствует реализация метода");
    },
    registration(input: AuthInput): Promise<AuthInfo> {
        throw Error("Отсутствует реализация метода");
    },
    logout(): Promise<AuthInfo> {
        throw Error("Отсутствует реализация метода");
    }
})

export const AppContextProvider = ({children}: any) => {
    const [page, setPage] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(RoleType.Undefined);
    const [userName, setUserName] = useState("");
    useEffect(() => {
        authRepository.getInfo().then((data) => {
            setState(data);
            if (!data.isAuthenticated) {
                console.log(123)
            }
        });
    }, []);


    const setState = (authInfo: AuthInfo) => {
        setIsAuthenticated(authInfo.isAuthenticated);
        setRole(authInfo.role);
        setUserName(authInfo.userName);
    }

    const login = async (input: AuthInput): Promise<AuthInfo> => {
        let data = await authRepository.login(input);
        setState(data);
        return data;
    };

    const registration = async (input: AuthInput): Promise<AuthInfo> => {
        let data = await authRepository.registration(input);
        setState(data);
        return data;
    };


    const logout = async (): Promise<AuthInfo> => {
        let data = await authRepository.logout();
        setState(data);
        return data;
    };

    const changePage = (page:string) => {
        setPage(page);
    }

    return (
        <AppContext.Provider value={{ userName, isAuthenticated, role, login, registration, logout, page,changePage }}>
            {children}
        </AppContext.Provider>
    )
}