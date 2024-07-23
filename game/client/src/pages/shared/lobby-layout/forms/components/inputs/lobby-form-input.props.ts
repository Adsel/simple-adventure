export const LobbyFormInputProps = {
    errorMsg: {
        type: String,
        required: false,
        default: null,
    },
    id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    showPassword: {
        type: Boolean,
        required: false,
        default: false,
    },
    text: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false,
        default: 'text',
    },
};
