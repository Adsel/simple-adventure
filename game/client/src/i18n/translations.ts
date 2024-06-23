export function loadLocaleMessages() {
    const context = require.context(
        '../../public/locales',
        true,
        /[A-Za-z0-9-_,\s]+\.json$/i
    );
    const messages: { [key: string]: any } = {};
    context.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = context(key);
        }
    });
    return messages;
}
