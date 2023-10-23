import {failedValidationResponse} from "../response/failed-validation-response";
import {okResponse} from "../response/ok-response";
import {myDataSource} from "../../database/type-orm/data-source";
import {Player} from "../../database/entities/player.entity";
import {Summoner} from "../../database/entities/summoner.entity";

const isValid = (req: any) => {
    return req.params && req.params.playerId;
};

export const API_METHOD_GET_SUMMONERS = async (req: any, res: any, next: any) => {
    if (!isValid(req)) {
        failedValidationResponse(res);
    }

    const summoners = await myDataSource.getRepository(Summoner).find({
        where: {player_id: req.params.playerId}
    });

    okResponse(res, {summoners});
}
