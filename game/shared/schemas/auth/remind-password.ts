import * as yup from "yup";
import {TFunction} from "./i18n";
import {AUTH_REQUIREMENTS} from "./requirements";

const looksLikeEmail = (value: string) => /.+@.+\..+/.test(value);

export const remindPasswordFormSchema = (t?: TFunction) => {
  return yup.object({
    login: yup
      .string()
      .required(t ? t("login.validation.required") : "login.validation.required")
      .test(
        "login-or-email",
        t ? t("login.validation.format") : "login.validation.format",
        (value) => {
          const v = (value ?? "").trim();
          if (!v) return false;
          if (looksLikeEmail(v)) return true;
          return (
            v.length >= AUTH_REQUIREMENTS.fields.login.min &&
            v.length <= AUTH_REQUIREMENTS.fields.login.max
          );
        }
      ),
  });
};

