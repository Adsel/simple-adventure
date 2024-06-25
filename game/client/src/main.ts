import {createApp} from 'vue'
import {clientRouter} from "@/routing/router";
import App from './App.vue'
import Vue3Toastify, {type ToastContainerOptions} from 'vue3-toastify';
import {createI18n} from "vue-i18n";
import {loadLocaleMessages} from "@/i18n/translations";


function createVueApp() {
    const messages = loadLocaleMessages();
    console.log('t' , messages);

    const i18n: any = createI18n({
        legacy: false,
        locale: navigator.language.split('-')[0],
        fallbackLocale: 'en',
        messages,
    });

    const app = createApp(App);

    app.use(i18n);
    app.use(clientRouter);
    app.use(Vue3Toastify, {
        autoClose: 3000,
    } as ToastContainerOptions);

    app.mount('#app')
}

createVueApp();
