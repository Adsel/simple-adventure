export const AUTH_REQUIREMENTS = {
  fields: {
    login: {
      min: 6,
      max: 20,
      unique: true,
    },
    password: {
      min: 8,
      max: 64,
      rules: {
        alpha: /[a-zA-Z]/,
        number: /\d/,
        char: /[!@#$%^&*(),.?":{}|<>]/,
      },
    },
    mail: {
      min: 6,
      max: 264,
      unique: true,
    },
  },
} as const;

