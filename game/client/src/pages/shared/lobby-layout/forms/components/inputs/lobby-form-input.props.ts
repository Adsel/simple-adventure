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
    type: {
        type: String,
        required: false,
        default: 'text',
    },
};
