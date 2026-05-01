import * as yup from "yup";
import {TFunction} from "./i18n";
import {emailSchema} from "./fields/email";
import {loginSchema} from "./fields/login";
import {confirmPasswordSchema, passwordSchema} from "./fields/password";
import {termsSchema} from "./fields/terms";

export const registerFormSchema = (t?: TFunction) => {
  return yup.object({
    email: emailSchema(t),
    login: loginSchema(t),
    password: passwordSchema(t),
    passwordRepeat: confirmPasswordSchema("password", t),
    terms: termsSchema(t),
    privacy: termsSchema(t),
  });
};

