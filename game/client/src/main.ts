import {createApp} from 'vue'
import {clientRouter} from "@/routing/router";
import App from './App.vue'
import Vue3Toastify, {type ToastContainerOptions} from 'vue3-toastify';


const app = createApp(App);

app.use(clientRouter);
app.use(Vue3Toastify, {
    autoClose: 3000,
} as ToastContainerOptions);


app.mount('#app')
