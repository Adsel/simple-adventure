import {HttpStatusEnum} from "../../enums/http/http-status.enum";

export const okResponse = (res: any, data: object = {}): void => {
    res.status(HttpStatusEnum.OK).json(data);
};
