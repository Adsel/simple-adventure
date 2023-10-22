const bcrypt = require('bcrypt');

const passwordHashLength = process.env.AUTH_PASSWORD_HASH_LENGTH ? +process.env.AUTH_PASSWORD_HASH_LENGTH : 10;

export const getHashedString = (plainText: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plainText, passwordHashLength, (error: Error | undefined, hashedPassword: string) => {
            if (error) {
                reject(error);
            } else {
                resolve(hashedPassword);
            }
        });
    });
};

export const isEqualToHashedString = (plainText: string, hashedText: string): Promise<boolean> => {
    return new Promise((resolve) => {
        bcrypt.compare(plainText, hashedText, (err: Error | undefined, result: boolean) => {
            resolve(err === undefined && result);
        });
    });
};
