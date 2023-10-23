import {getRequest} from "@/api/request/request.api";
import {API_CONFIG} from "@/config/auth.config";
import {IGetSummonersResponse} from "@/interfaces/api/summoner.interface";

export const apiMethodGetSummoners = (playerId: number): Promise<IGetSummonersResponse> =>
    getRequest(`${API_CONFIG.url}player/${playerId}/summoners`, true);
