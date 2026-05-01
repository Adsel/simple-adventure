import * as yup from "yup";
import {AUTH_REQUIREMENTS} from "../requirements";
import {passthroughT, TFunction} from "../i18n";

export const passwordSchema = (t: TFunction = passthroughT) => {
  return yup
    .string()
    .matches(AUTH_REQUIREMENTS.fields.password.rules.alpha, t("password.validation.one-letter"))
    .matches(AUTH_REQUIREMENTS.fields.password.rules.number, t("password.validation.one-number"))
    .matches(AUTH_REQUIREMENTS.fields.password.rules.char, t("password.validation.one-special-char"))
    .min(
      AUTH_REQUIREMENTS.fields.password.min,
      t("password.validation.min-length", {length: AUTH_REQUIREMENTS.fields.password.min})
    )
    .max(
      AUTH_REQUIREMENTS.fields.password.max,
      t("password.validation.max-length", {length: AUTH_REQUIREMENTS.fields.password.max})
    )
    .required(t("password.validation.required"));
};

export const confirmPasswordSchema = (
  passwordFieldName: string,
  t: TFunction = passthroughT
) => {
  return yup
    .string()
    .required(t("password.validation.required"))
    .oneOf([yup.ref(passwordFieldName)], t("password.validation.not-identical"));
};

