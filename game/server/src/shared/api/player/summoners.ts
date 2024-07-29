import {failedValidationResponse} from "../response/failed-validation-response";
import {okResponse} from "../response/ok-response";
import {myDataSource} from "../../database/type-orm/data-source";
import {Summoner} from "../../database/entities/summoner.entity";
import {getLevel, getRequiredExpToLevelUp} from "../../formulas/experience.formula";
import {notFoundResponse} from "../response/not-found-response";

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

    if (!summoners) {
        notFoundResponse(res);
    }

    okResponse(res, {
        summoners: summoners.map((summonerData: any) => {
            summonerData.summoner_level = getLevel(summonerData.summoner_experience);
            summonerData.summoner_experience_to_up = getRequiredExpToLevelUp(summonerData.summoner_experience);
            return summonerData;
        })
    });
}
