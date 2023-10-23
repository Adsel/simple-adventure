import jwt = require('jsonwebtoken');
import {Player} from "../database/entities/player.entity";

const authSecretKey = process.env.AUTH_JWT_HASH || 'secret-key';

export function generateAuthToken(user: Player): string {
    return jwt.sign(user.player_login, authSecretKey);
}

// const token = req.headers.authorization;
export function isAuthorizedUser(token: string): boolean {
    try {
        jwt.verify(token, authSecretKey);

        return true;
    } catch (error) {
        console.error(error);
    }

    return false;
}
