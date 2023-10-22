import {HttpStatusEnum} from "../../enums/http/http-status.enum";

export const badRequestResponse = (res: any, message: string|null = null): void => {
    res.status(HttpStatusEnum.BAD_REQUEST).json({
        message: message ? message : 'Forbidden'
    });
}
