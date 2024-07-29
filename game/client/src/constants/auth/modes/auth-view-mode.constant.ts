import {IAuthModes} from "@/interfaces/auth/auth-modes.interface";

export const AUTH_AVAILABLE_ACTIONS: IAuthModes = {
    'login': [
        {
            id: 1,
            mode: 'remind-password',
            name: 'auth.headers.remind-password'
        },
        {
            id: 2,
            mode: 'registration',
            name: 'auth.headers.register'
        },
    ],
    'remind-password': [
        {
            id: 1,
            mode: 'login',
            name: 'auth.headers.sign-in'
        },
        {
            id: 2,
            mode: 'registration',
            name: 'auth.headers.register'
        },
    ],
    'registration': [
        {
            id: 1,
            mode: 'login',
            name: 'auth.headers.sign-in'
        },
    ],
};
