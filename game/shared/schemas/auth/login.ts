import * as yup from "yup";
import {TFunction} from "./i18n";
import {loginSchema} from "./fields/login";
import {passwordSchema} from "./fields/password";

export const loginFormSchema = (t?: TFunction) => {
  return yup.object({
    login: loginSchema(t),
    password: passwordSchema(t),
  });
};

