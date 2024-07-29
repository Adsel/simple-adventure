interface IPasswordFieldRequirement extends IFieldRequirement {
    rules: {
        alpha: RegExp;
        number: RegExp;
        char: RegExp;
    }
}

interface IFieldRequirement {
    min: number;
    max: number;
    unique?: boolean;
}

export interface IFieldsRequirements {
    login: IFieldRequirement;
    password: IPasswordFieldRequirement;
    mail: IFieldRequirement;
}

export interface IAccountFieldsRequirements {
    fields: IFieldsRequirements;
}
