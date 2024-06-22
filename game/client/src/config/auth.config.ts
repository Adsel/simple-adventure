import {IApiConfig} from "@/interfaces/api/auth.interface";
import {IAccountFieldsRequirements} from "@/interfaces/auth/fields-requirements.interface";

export const API_CONFIG: IApiConfig = {
    url: `${process.env.VUE_APP_API_URL || 'http://localhost:3001'}/api/`
}

export const AUTH_REQUIREMENTS: IAccountFieldsRequirements = {
    fields: {
        login: {
            min: 6,
            max: 20,
            unique: true
        },
        password: {
            min: 8,
            max: 64,
            rules: {
                alpha: /[a-zA-Z]/,
                number: /\d/,
                char: /[!@#$%^&*(),.?":{}|<>]/
            }
        },
        mail: {
            min: 6,
            max: 264,
            unique: true
        }
    }
}
