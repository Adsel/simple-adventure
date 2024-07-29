import {LS_KEY_LANGUAGE} from "@/constants/local-storage-keys/language.constant";

export class LanguageManagement {
    protected currentLanguage: string;

    constructor() {
        const langFromLS = localStorage.getItem(LS_KEY_LANGUAGE);
        if (langFromLS) {
            this.currentLanguage = langFromLS;
        } else {
            const defaultLanguage: string = (navigator.language || 'en').toLowerCase();
            this.changeLanguage(defaultLanguage);
            this.currentLanguage = defaultLanguage;
        }
    }

    public getLanguage() {
        return this.currentLanguage;
    }

    public changeLanguage(lang: string) {
        console.log('changeLanguage', lang);
        localStorage.setItem(LS_KEY_LANGUAGE, lang);
    }
}
