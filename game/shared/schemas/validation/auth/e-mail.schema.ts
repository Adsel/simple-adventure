export const EMailSchema = (yup: any, $t: any) => {
    return yup.string()
        .required($t('email.validation.required'))
        .email($t('email.validation.format'));
};
