import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { invites, posts, shares, users } from "../types/DbTypes";
import { BASE_URL } from "./constants";

export const api = axios.create({
    baseURL: BASE_URL
});


export interface IDefaultResponse {
    success: boolean;
    message: string;
}

export interface ILoginResponse extends IDefaultResponse {
    token: string;
}

export type IUser = users & {
    invites: invites[];
    posts: posts[];
    shares: shares[];
}

interface IGetUser extends IDefaultResponse {
    user: users & {
        invites: invites[];
        posts: posts[];
        shares: shares[];
    }
}

export async function testLogin() {
    const token = await AsyncStorage.getItem("@token");
    return (await api.get<IDefaultResponse>("/users/test", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }));
}
export async function register(first_name: string, last_name: string, email: string, password: string) {
    const response = await api.post<IDefaultResponse>("/users", { first_name, last_name, email, password });
    return response.data;
}
export async function resend(email: string) {
    const response = await api.post<IDefaultResponse>("/users/re-send", { email });
    return response.data;
}
export async function verify(email: string, code: number) {
    const response = await api.post<ILoginResponse>("/users/verify", { email, code });
    return response.data;
}
export async function login(email: string, password: string) {
    const response = await api.post<ILoginResponse>("/users/login", { email, password });
    return response.data;
}
export async function getUser() {
    const token = await AsyncStorage.getItem("@token");
    const response = await api.get<IGetUser>("/users", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}
