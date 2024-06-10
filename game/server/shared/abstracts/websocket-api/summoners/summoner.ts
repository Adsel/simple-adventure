import {myDataSource} from "../../../database/type-orm/data-source";
import {Summoner} from "../../../database/entities/summoner.entity";
import {getLevel, getRequiredExpToLevelUp} from "../../../formulas/experience.formula";
import {IConnectedPlayer} from "../../../interfaces/players/connected-player.interface";

const isValid = (data: any) => {
    return !!data.summonerId && +data.summonerId > 0 && !!data.playerId && +data.playerId > 0;
};

// TODO:
// interface for `data`
export const API_METHOD_GET_SUMMONER_DATA = async (
    data: any,
    connectedPlayers: IConnectedPlayer[]
) => {
    if (!isValid(data)) {
        // TODO:
        // send error msg using websocket
        return {};
    }

    const summonerId = +data.summonerId;
    const playerId = +data.playerId;

    let summoners = await myDataSource.getRepository(Summoner).find({
        where: {
            player_id: playerId,
            summoner_id: summonerId,
        },
        take: 1
    });

    if (!summoners || summoners.length < 1) {
        // TODO:
        // send error msg using websocket
        return {};
    }

    // TODO:
    // ODT type for summonerData and summoner
    const summonerData: any = summoners[0];
    const summoner: any = {
        summonerLevel: getLevel(summonerData.summoner_experience),
        summonerExpToUp: getRequiredExpToLevelUp(summonerData.summoner_experience),
        summonerExp: summonerData.summoner_experience,
        summonerNick: summonerData.summoner_nickname,
        characterImage: summonerData.summoner_outfit,
        x: 0,
        y: 0
    };

    return {
        summonerId,
        summoner,
        player: {
            type: data.type,
            location: {
                // TODO:
                // zapisać dane o mapie do bazy
                // odczytać z bazy
                backgroundImage: 'backgrounds/Sprite-background-0001.png',
                width: 640,
                height: 640
            },
            summoner,
            players: connectedPlayers.map((connectedPlayer: IConnectedPlayer) => {
                return {
                    summonerId: connectedPlayer.summonerId,
                    ...connectedPlayer.summoner,
                };
            })
        }
    }

}
