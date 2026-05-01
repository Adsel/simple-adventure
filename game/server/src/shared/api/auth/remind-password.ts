
import {failedValidationResponse} from "../response/failed-validation-response";
import {Player} from "../../database/entities/player.entity";
import {getHashedString} from "../../services/auth-hash.service";
import {okResponse} from "../response/ok-response";
import {badRequestResponse} from "../response/bad-request-response";
import {myDataSource} from "../../database/type-orm/data-source";
import {unauthorizedResponse} from "../response/unauthorized-response";
import {remindPasswordFormSchema} from "shared/schemas/auth";
import {validateOrFail} from "../../validation/yup-validate";

const searchUserByMailOrLogin = async (emailOrLogin: string): Promise<Player|null> => {
    return myDataSource.getRepository(Player).findOne({
        where: [
            {player_login: emailOrLogin},
            {player_email: emailOrLogin}
        ]
    });
};

export const API_METHOD_REMIND_PASSWORD = async (req: any, res: any, next: any): Promise<void> => {
    // client sends `login`; server internally calls it emailOrLogin
    const ok = await validateOrFail(res, remindPasswordFormSchema(), {login: req.body?.emailOrLogin});
    if (!ok) {
        return;
    }

    try {
        const userDB = await searchUserByMailOrLogin(req.body.emailOrLogin);
        if (!userDB) {
            badRequestResponse(res);
            return;
            // TODO:
            // use ambitious message - like from success msg
        }

        console.log('userDB', userDB);
        okResponse(res, {
            message: 'If there is an associated account, an email will be sent to reset the password'
        });
        return;
    } catch (error) {
        console.error('API_METHOD_REMIND_PASSWORD', error);
    }

    badRequestResponse(res);
};
