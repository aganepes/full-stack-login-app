import {useEffect, useState,type ReactNode} from 'react';
import type { ApiError, ApiResponse, User } from "../types/user";
import { AuthContext } from '../contexts/AuthContext';

const API_URL_AUTH:string = "http://localhost:5000/api/auth";

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
    const [user, setUser] = useState<User|null>(null);
    const [Loading,setLoading] = useState<boolean>(true); 
    useEffect(()=>{ 

        (async()=>{
            const userData = await me();
            if(userData.success){
                setUser(userData.user);
            }
            setLoading(false)
        })();
        
    },[]);

    const register = async (userData: User): Promise<ApiError|ApiResponse> => {
        const response = await fetch(`${API_URL_AUTH}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials:"include",
            body: JSON.stringify(userData),
        });
        const message = await response.json();
        if (message.success) {
            setUser(message.user);
            return message;
        }
            
        return message
        
    }
    const login = async (userData: User): Promise<ApiError|ApiResponse> => {
        const response = await fetch(`${API_URL_AUTH}/login`, {
            body: JSON.stringify(userData),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials:"include"
        });
        const message = await response.json();
        if (message.success) {
            setUser(message.user);
            return message
        }
        
        return message;
    }
    const logout = async():Promise<ApiError|ApiResponse> => {
        const response = await fetch(`${API_URL_AUTH}/logout`, {
            method: 'POST',
            credentials:"include",
        });
        const message = await response.json();
        if (message.success) {
            setUser(null);
            return message;
        }
        
        return message;
    }
    const refreshToken = async():Promise<ApiError|ApiResponse> => {
       const response = await fetch(`${API_URL_AUTH}/refresh-token`, {
            method: 'POST',
            credentials:"include",
        });
        const message = await response.json();
        return message;
    }
    const me = async () : Promise<ApiError|ApiResponse> => {
       const response = await fetch(`${API_URL_AUTH}/me`, {
            method: 'GET',
            credentials:"include",
        });

        const userData = await response.json();
        return userData;
            
    }
    return (
        <AuthContext.Provider value={{Loading,user,register, login, logout, refreshToken, me }}>
            {children}
        </AuthContext.Provider>
    );
};