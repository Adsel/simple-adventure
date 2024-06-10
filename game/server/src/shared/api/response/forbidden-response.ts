import {HttpStatusEnum} from "../../enums/http/http-status.enum";

const DEFAULT_HTTP_UNAUTHORIZED_MESSAGE = 'Forbidden!';

export const forbiddenResponse = (res: any, passedMsg: string | null = null): void => res.status(HttpStatusEnum.FORBIDDEN).json({
    message: passedMsg ? passedMsg : DEFAULT_HTTP_UNAUTHORIZED_MESSAGE
});
