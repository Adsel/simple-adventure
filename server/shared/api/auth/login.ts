import {databaseConnection} from "../../database/connection/set-connection";
import {failedValidationResponse} from "../response/failed-validation-response";
import {badRequestResponse} from "../response/bad-request-response";
import {okResponse} from "../response/ok-response";
import {notFoundResponse} from "../response/not-found-response";

export const API_METHOD_LOGIN = (req: any, res: any, next: any) => {
    if (!req.body || !req.body.nickname) {
        failedValidationResponse(res);
        return;
    }

    const sqlQuery = 'SELECT * FROM summoner WHERE summoner_nick = ?';

    const nickname = req.body.nickname;
    databaseConnection.query(sqlQuery, [nickname], function (err: any, result: any) {
        if (err) {
            badRequestResponse(res);
            return;
        }

        if (!result || !result.length || result.length === 0) {
            notFoundResponse(res, 'Player not found!');
            return;
        }

        okResponse(res, result[0]);
    });
};
