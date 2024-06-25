import {IAuthModes} from "@/interfaces/auth/auth-modes.interface";

export const AUTH_AVAILABLE_ACTIONS: IAuthModes = {
    'login': [
        {
            id: 1,
            mode: 'remind-password',
            name: 'login.headers.remind-password'
        },
        {
            id: 2,
            mode: 'registration',
            name: 'login.headers.register'
        },
    ],
    'remind-password': [
        {
            id: 1,
            mode: 'login',
            name: 'login.headers.sign-in'
        },
        {
            id: 2,
            mode: 'registration',
            name: 'login.headers.register'
        },
    ],
    'registration': [
        {
            id: 1,
            mode: 'login',
            name: 'login.headers.sign-in'
        },
    ],
};
