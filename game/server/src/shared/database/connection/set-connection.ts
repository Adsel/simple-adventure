import {myDataSource} from "../type-orm/data-source";

export const initDbConnection = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        myDataSource.initialize().then(() => {
            console.log('Connected with database!');
            resolve(true);
        }).catch((err: any) => {
            console.error('[ERROR] Can`t connect with database!', err);
            reject();
        });
    });
};
