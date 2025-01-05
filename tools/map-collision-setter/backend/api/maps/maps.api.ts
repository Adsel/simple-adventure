import {DatabaseClass} from "../../classes/app/Database.class";
import {Map} from "../../entities/map.entity";
import {notFoundResponse} from "../response/not-found-response";
import {okResponse} from "../response/ok-response";

export const apiMethodGetMaps = async (dataSource: DatabaseClass, req: any, res: any, next: any) => {
    const maps: Map[] = await dataSource.getDataSource().getRepository(Map).find();

    if (!maps || maps.length <= 0) {
        notFoundResponse(res);
    }

    okResponse(res, maps);
}
