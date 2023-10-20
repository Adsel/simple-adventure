// import {databaseConnection} from "../../database/connection/set-connection";
import {failedValidationResponse} from "../response/failed-validation-response";
import {badRequestResponse} from "../response/bad-request-response";
import {okResponse} from "../response/ok-response";
import {notFoundResponse} from "../response/not-found-response";
import {myDataSource} from "../../database/type-orm/data-source";
import {Player} from "../../database/entities/player-entity";

// TODO:
// types for res.body
export const API_METHOD_LOGIN = async (req: any, res: any, next: any) => {
    try {
        const user = await myDataSource.getRepository(Player).findOne(

            { where:
                    { player_login: req?.body?.login, player_password: req?.body?.password }
            })
        // const results = await myDataSource.getRepository(User).save(user)
        // return res.send(results)

        console.log()
    } catch (e) {
        console.error('err:', e);
    }


    okResponse(res, []);
    return;

    // TODO: adjust
    if (!req.body || !req.body.login || !req.body.password) {
        failedValidationResponse(res);
        return;
    }

    // TODO:
    // ORM
    const sqlQuery = 'SELECT * FROM player WHERE player_login = ? AND player_password = ?';

    const login = req.body.login;
    const password = req.body.password;
    // databaseConnection.query(sqlQuery, [login, password], function (err: any, result: any) {
    //     if (err) {
    //         badRequestResponse(res);
    //         return;
    //     }
    //
    //     if (!result || !result.length || result.length === 0) {
    //         notFoundResponse(res, 'Player not found!');
    //         return;
    //     }
    //
    //     okResponse(res, result[0]);
    // });
};
// app.post("/users", async function (req: Request, res: Response) {
//     const user = await myDataSource.getRepository(User).create(req.body)
//     const results = await myDataSource.getRepository(User).save(user)
//     return res.send(results)
// })
