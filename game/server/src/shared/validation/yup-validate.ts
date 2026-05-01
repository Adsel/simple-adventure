import {failedValidationResponse} from "../api/response/failed-validation-response";

export const validateOrFail = async (res: any, schema: any, data: any) => {
  try {
    await schema.validate(data, {abortEarly: false, stripUnknown: true});
    return true;
  } catch (e) {
    failedValidationResponse(res);
    return false;
  }
};

