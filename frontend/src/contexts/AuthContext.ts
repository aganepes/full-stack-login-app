import { createContext } from "react";
import type { ApiError, ApiResponse, User } from "../types/user";


type AuthContextType = {
    user: User | null;
    Loading:boolean,
    register: (userData: User) => Promise<ApiError | ApiResponse> ;
    login: (userData: User) => Promise<ApiError | ApiResponse>;
    refreshToken:()=>Promise<ApiError | ApiResponse>;
    logout: () => Promise<ApiError | ApiResponse>;
    me:()=>Promise<ApiError | ApiResponse>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);