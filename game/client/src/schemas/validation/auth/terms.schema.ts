export const TermsSchema = (yup: any, $t: any) => {
    return yup.bool()
        .oneOf([true], $t('terms.validation.required'))
};
