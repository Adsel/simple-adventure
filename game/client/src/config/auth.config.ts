import {IApiConfig} from "@/interfaces/api/auth.interface";
import {IAccountFieldsRequirements} from "@/interfaces/auth/fields-requirements.interface";
import {AUTH_REQUIREMENTS as SHARED_AUTH_REQUIREMENTS} from "shared/schemas/auth";

export const API_CONFIG: IApiConfig = {
    url: `${process.env.VUE_APP_API_URL || 'http://localhost:3001'}/api/`
}

export const AUTH_REQUIREMENTS: IAccountFieldsRequirements = SHARED_AUTH_REQUIREMENTS;
