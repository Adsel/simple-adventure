import {DataSource} from "typeorm";
import {CONNECTION_CONFIGURATION} from "../../constants/connection-configuration";

export const myDataSource = new DataSource(CONNECTION_CONFIGURATION);
