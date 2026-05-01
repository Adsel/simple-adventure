import {Player} from "../../database/entities/player.entity";
import {getHashedString} from "../../services/auth-hash.service";
import {okResponse} from "../response/ok-response";
import {badRequestResponse} from "../response/bad-request-response";
import {registerFormSchema} from "shared/schemas/auth";
import {validateOrFail} from "../../validation/yup-validate";

const createUser = async (login: string, password: string): Promise<Player> => {
    const user = new Player();
    user.player_login = login;
    user.player_password = await getHashedString(password);

    return await user.save();
};

export const API_METHOD_REGISTER = async (req: any, res: any, next: any): Promise<void> => {
    const ok = await validateOrFail(res, registerFormSchema(), req.body || {});
    if (!ok) {
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
