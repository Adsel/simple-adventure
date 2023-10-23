import jwt = require('jsonwebtoken');
import {Player} from "../database/entities/player.entity";

const authSecretKey = process.env.AUTH_JWT_HASH || 'secret-key';

export function generateAuthToken(user: Player): string {
    return jwt.sign(user.player_login, authSecretKey);
}

export const getAuthSecretKey = () => authSecretKey;
