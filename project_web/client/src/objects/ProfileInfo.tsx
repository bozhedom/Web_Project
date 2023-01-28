import RoleType from "../enums/RoleType";
import { ProfileInput } from "./ProfileInput";

export type ProfileInfo = {
    id: string;
    userName: string;
    role: RoleType;
    userProfile: ProfileInput;
    errorMessage: string;
};