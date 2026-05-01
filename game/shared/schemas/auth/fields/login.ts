import * as yup from "yup";
import {AUTH_REQUIREMENTS} from "../requirements";
import {passthroughT, TFunction} from "../i18n";

export const loginSchema = (t: TFunction = passthroughT) => {
  return yup
    .string()
    .min(
      AUTH_REQUIREMENTS.fields.login.min,
      t("login.validation.min-length", {length: AUTH_REQUIREMENTS.fields.login.min})
    )
    .max(
      AUTH_REQUIREMENTS.fields.login.max,
      t("login.validation.max-length", {length: AUTH_REQUIREMENTS.fields.login.max})
    )
    .required(t("login.validation.required"));
};

