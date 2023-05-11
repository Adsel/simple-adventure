import {CONNECTION_CONFIGURATION} from "../../constants/connection-configuration";

const mysql = require('mysql');

export const databaseConnection = mysql.createConnection(CONNECTION_CONFIGURATION);

databaseConnection.connect(function (err: any) {
    if (err) throw err;
    console.log("Connected with database!");
});
