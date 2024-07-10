import {AUTH_REQUIREMENTS} from "@/config/auth.config";

export const PasswordSchema = (yup: any, $t: any) => {
    return yup.string()
        .matches(AUTH_REQUIREMENTS.fields.password.rules.alpha, $t('password.validation.one-letter'))
        .matches(AUTH_REQUIREMENTS.fields.password.rules.number, $t('password.validation.one-number'))
        .matches(AUTH_REQUIREMENTS.fields.password.rules.char, $t('password.validation.one-special-char'))
        .max(AUTH_REQUIREMENTS.fields.password.min, $t('password.validation.min-length', {length: AUTH_REQUIREMENTS.fields.password.min}))
        .max(AUTH_REQUIREMENTS.fields.password.max, $t('password.validation.max-length', {length: AUTH_REQUIREMENTS.fields.password.max}))
        .required($t('password.validation.required'))
};
