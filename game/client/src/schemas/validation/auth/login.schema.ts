import {AUTH_REQUIREMENTS} from "@/config/auth.config";

export const LoginSchema = (yup: any, $t: any) => {
    return yup.string()
        .min(AUTH_REQUIREMENTS.fields.login.min, $t('login.validation.min-length', {length: AUTH_REQUIREMENTS.fields.login.min}))
        .max(AUTH_REQUIREMENTS.fields.login.max, $t('login.validation.max-length', {length: AUTH_REQUIREMENTS.fields.login.max}))
        .required($t('login.validation.required'))
};
