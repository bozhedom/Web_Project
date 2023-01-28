import RoleType  from "../enums/RoleType";

export type AuthInfo = {
    isAuthenticated: boolean;
    role: RoleType;
    userName: string;
    errorMessage: string;
};