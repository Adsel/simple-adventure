import {failedValidationResponse} from "../response/failed-validation-response";
import {Player} from "../../database/entities/player-entity";
import {getHashedString} from "../../services/auth-hash.service";
import {okResponse} from "../response/ok-response";
import {badRequestResponse} from "../response/bad-request-response";

const isValid = (req: any) => {
    return (
        req.body &&
        req.body.login &&
        req.body.password &&
        req.body.repeatedPassword &&
        req.body.password === req.body.repeatedPassword
    );
};

const createUser = async (login: string, password: string): Promise<Player> => {
    const user = new Player();
    user.player_login = login;
    user.player_password = await getHashedString(password);

    return await user.save();
};

export const API_METHOD_REGISTER = async (req: any, res: any, next: any): Promise<void> => {
    if (!isValid(req)) {
        failedValidationResponse(res);
        return;
    }

    const login: string = req.body.login;
    const existingUser = await Player.findOne({ where: { player_login: login } });
    if (existingUser) {
        badRequestResponse(res, 'Login exists!');
    }

    try {
        const createdUser = await createUser(login, req.body.password);
        okResponse(res, createdUser);
    } catch (error) {
        console.log(error);
        badRequestResponse(res);
    }
};
