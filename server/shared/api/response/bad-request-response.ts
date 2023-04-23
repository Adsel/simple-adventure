import {HttpStatusEnum} from "../../enums/http/http-status.enum";

export const badRequestResponse = (res: any): void => {
    res.status(HttpStatusEnum.BAD_REQUEST).json({
        message: 'Forbidden'
    });
}
