import {IApiConfig} from "@/interfaces/api/auth.interface";

export const API_CONFIG: IApiConfig = {
    url: `${process.env.VUE_APP_API_URL || 'http://localhost:3001'}/api/`
}
