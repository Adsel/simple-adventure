import {API_CONFIG} from "@/config/auth.config";
import {postRequest} from "@/api/request/request.api";
import {IAuthLoginResponse} from "@/interfaces/api/auth.interface";

export const apiMethodLogin = (login: string, password: string): Promise<IAuthLoginResponse> => {
    return postRequest(`${API_CONFIG.url}auth/login`, {login, password});
};

export const apiMethodRegister = (
    login: string,
    password: string,
    rePassword: string,
    email: string,
    terms: boolean,
    privacy: boolean,
): Promise<IAuthLoginResponse> => {
    return postRequest(`${API_CONFIG.url}auth/register`, {
        login,
        password,
        rePassword,
        email,
        terms,
        privacy
    });
};

export const apiMethodRemindPassword = (emailOrLogin: string): Promise<any> => {
    return postRequest(`${API_CONFIG.url}auth/remind-password`, {emailOrLogin});
};
