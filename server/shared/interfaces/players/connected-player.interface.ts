import {ISummoner} from "./summoner.interface";

export interface IConnectedPlayer {
    summonerId: number;
    summoner: ISummoner;
    socket: any;
}
