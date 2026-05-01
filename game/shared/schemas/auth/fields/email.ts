import * as yup from "yup";
import {AUTH_REQUIREMENTS} from "../requirements";
import {passthroughT, TFunction} from "../i18n";

export const emailSchema = (t: TFunction = passthroughT) => {
  return yup
    .string()
    .required(t("email.validation.required"))
    .min(AUTH_REQUIREMENTS.fields.mail.min, t("email.validation.min-length", {length: AUTH_REQUIREMENTS.fields.mail.min}))
    .max(AUTH_REQUIREMENTS.fields.mail.max, t("email.validation.max-length", {length: AUTH_REQUIREMENTS.fields.mail.max}))
    .email(t("email.validation.format"));
};

