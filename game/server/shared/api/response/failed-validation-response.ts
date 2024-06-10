import {HttpStatusEnum} from "../../enums/http/http-status.enum";

export const failedValidationResponse = (res: any): void => {
    res.status(HttpStatusEnum.FORBIDDEN).send({message: 'Missing required data'});
}
