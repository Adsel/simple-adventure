import {databaseConnection} from "../../database/connection/set-connection";
import {failedValidationResponse} from "../response/failed-validation-response";
import {badRequestResponse} from "../response/bad-request-response";
import {okResponse} from "../response/ok-response";
import {notFoundResponse} from "../response/not-found-response";

// TODO:
// types for res.body
export const API_METHOD_LOGIN = (req: any, res: any, next: any) => {
    if (!req.body || !req.body.login || !req.body.password) {
        failedValidationResponse(res);
        return;
    }

    // TODO:
    // ORM
    const sqlQuery = 'SELECT * FROM player WHERE player_login = ? AND player_password = ?';

    const login = req.body.login;
    const password = req.body.password;
    databaseConnection.query(sqlQuery, [login, password], function (err: any, result: any) {
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
