import apiClient from "./apiClient";
import type { AuthUser } from "../../domain/entities/User";



export const authApi = {
    register:async ( data: {email: string; username:string; password:string}): Promise<AuthUser> => {
        const response= await apiClient.post<{user: AuthUser["user"]}>("/auth/register",data);
        return response.data as unknown as AuthUser;
    },

    login: async (data: {email: string; password: string}): Promise<AuthUser> => {
        const response = await apiClient.post<AuthUser>("/auth/login",data);
        return response.data;
    },
};