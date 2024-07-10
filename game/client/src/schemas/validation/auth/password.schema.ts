import {AUTH_REQUIREMENTS} from "@/config/auth.config";

export const PasswordSchema = (yup: any) => {
    return yup.string()
        .min(AUTH_REQUIREMENTS.fields.password.min, `Password must be at least ${AUTH_REQUIREMENTS.fields.password.min} characters long!`)
        .max(AUTH_REQUIREMENTS.fields.password.max, `Password can be at most ${AUTH_REQUIREMENTS.fields.password.max} characters long!`)
        .matches(AUTH_REQUIREMENTS.fields.password.rules.alpha, 'Password must contain at least one letter!')
        .matches(AUTH_REQUIREMENTS.fields.password.rules.number, 'Password must contain at least one number!')
        .matches(AUTH_REQUIREMENTS.fields.password.rules.char, 'Password must contain at least one special character!')
        .required('Password is required!')
};
