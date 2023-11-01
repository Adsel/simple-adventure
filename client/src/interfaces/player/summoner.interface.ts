export interface ISummoner {
    summoner_id: number;
    summoner_nickname: string;
    summoner_experience: number;
    summoner_level: number;
    summoner_experience_to_up: number;
    summoner_outfit: string;
}

export interface ISummonerChoosingList {
    prev?: ISummoner,
    current?: ISummoner,
    next?: ISummoner,
}
