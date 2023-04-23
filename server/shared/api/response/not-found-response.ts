import {HttpStatusEnum} from "../../enums/http/http-status.enum";

const DEFAULT_HTTP_NOT_FOUND_MESSAGE = 'Resource not found!';

export const notFoundResponse = (res: any, passedMsg: string | null = null): void => res.status(HttpStatusEnum.NOT_FOUND).json({
    message: passedMsg ? passedMsg : DEFAULT_HTTP_NOT_FOUND_MESSAGE
});
