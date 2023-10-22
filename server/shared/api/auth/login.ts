import {failedValidationResponse} from "../response/failed-validation-response";
import {myDataSource} from "../../database/type-orm/data-source";
import {Player} from "../../database/entities/player-entity";
import {isEqualToHashedString} from "../../services/auth-hash.service";
import {unauthorizedResponse} from "../response/unauthorized-response";
import {okResponse} from "../response/ok-response";
import {generateAuthToken} from "../../services/auth.service";

const isValid = (req: any) => {
    return (
        req.body &&
        req.body.login &&
        req.body.password
    );
};

// TODO:
// types for res.body
export const API_METHOD_LOGIN = async (req: any, res: any, next: any) => {
    if (!isValid(req)) {
        failedValidationResponse(res);
        return;
    }

    try {
        const user = await myDataSource.getRepository(Player).findOne({
            where: {player_login: req.body.login}
        });

        if (!user) {
            unauthorizedResponse(res);
            return;
        }

        const passwordsAreEqual = await isEqualToHashedString(req.body.password, user.player_password);
        if (passwordsAreEqual) {
            // TODO:
            // sprawdz czy wczesniejszy token istnieje, jesli tak to wyloguj stara sesje?

            user.player_token = generateAuthToken(user);
            await user.save();

            okResponse(res, {token: user.player_token});
            return;
        }
    } catch (e) {
        console.error('err:', e);
    }

    unauthorizedResponse(res);
};

