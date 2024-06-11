export const AUTH_AVAILABLE_ACTIONS = {
    'login': [
        {
            id: 1,
            mode: 'remind-password',
            name: 'Remind password'
        },
        {
            id: 2,
            mode: 'registration',
            name: 'Register'
        },
    ],
    'remind-password': [
        {
            id: 1,
            mode: 'login',
            name: 'Sign in'
        },
        {
            id: 2,
            mode: 'registration',
            name: 'Register'
        },
    ],
    'registration': [
        {
            id: 1,
            mode: 'login',
            name: 'Sign in'
        },
    ],
};
