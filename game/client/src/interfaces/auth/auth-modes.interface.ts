export interface IAuthMode {
    id: number;
    mode: string;
    name: string;
}

export interface IAuthModes {
    login: IAuthMode[];
    'remind-password': IAuthMode[];
    registration: IAuthMode[];
}
