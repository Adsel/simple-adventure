import {HttpStatusEnum} from "../../enums/http/http-status.enum";

const DEFAULT_HTTP_UNAUTHORIZED_MESSAGE = 'Not authorized!';

export const unauthorizedResponse = (res: any, passedMsg: string | null = null): void => res.status(HttpStatusEnum.UNAUTHORIZED).json({
    message: passedMsg ? passedMsg : DEFAULT_HTTP_UNAUTHORIZED_MESSAGE
});
