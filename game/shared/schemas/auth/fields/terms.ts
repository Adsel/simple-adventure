import * as yup from "yup";
import {passthroughT, TFunction} from "../i18n";

export const termsSchema = (t: TFunction = passthroughT) => {
  return yup.bool().oneOf([true], t("terms.validation.required"));
};

