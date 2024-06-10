import {API_CONFIG} from "@/config/auth.config";
import {postRequest} from "@/api/request/request.api";
import {IAuthLoginResponse} from "@/interfaces/api/auth.interface";

export const apiMethodLogin = (login: string, password: string): Promise<IAuthLoginResponse> =>
    postRequest(`${API_CONFIG.url}auth/login`, {login, password});
