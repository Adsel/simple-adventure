import {API_CONFIG} from "@/config/auth.config";
import {postRequest} from "@/api/request/request.api";
import {IAuthLoginResponse} from "@/interfaces/api/auth.interface";

export const apiMethodLogin = (login: string, password: string): Promise<IAuthLoginResponse> => {
    return postRequest(`${API_CONFIG.url}auth/login`, {login, password});
};

export const apiMethodRemindPassword = (emailOrLogin: string): Promise<any> => {
    return postRequest(`${API_CONFIG.url}auth/remind-password`, {emailOrLogin});
};
