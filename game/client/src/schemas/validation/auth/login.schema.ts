import {AUTH_REQUIREMENTS} from "@/config/auth.config";

export const LoginSchema = (yup: any) => {
    return yup.string()
        .min(AUTH_REQUIREMENTS.fields.login.min, `Login must be at least ${AUTH_REQUIREMENTS.fields.login.min} characters long!`)
        .max(AUTH_REQUIREMENTS.fields.login.max, `Login can be at most ${AUTH_REQUIREMENTS.fields.login.max} characters long!`)
        .required('Login is required!')
};
