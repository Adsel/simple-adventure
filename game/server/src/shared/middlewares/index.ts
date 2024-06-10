import jwt = require('jsonwebtoken');
import {myDataSource} from "../database/type-orm/data-source";
import {Player} from "../database/entities/player.entity";
import {unauthorizedResponse} from "../api/response/unauthorized-response";
import {getAuthSecretKey} from "../services/auth.service";
import {forbiddenResponse} from "../api/response/forbidden-response";

export const middleware = {
    auth: async (req: any, res: any, next: any) => {
        const token = req.headers.authorization;
        if (!token || token.trim() === '') {
            unauthorizedResponse(res, 'Missing authorization token!');
            return;
        }

        try {
            jwt.verify(token, getAuthSecretKey());
            const user = await myDataSource.getRepository(Player).findOne({
                where: {player_token: token}
            });
            if (user) {
                next();
                return;
            }
        } catch (e: any) {
            forbiddenResponse(res, 'Invalid authorization token!');
            return;
        }

        unauthorizedResponse(res, 'Not authorized!');
    },
};
