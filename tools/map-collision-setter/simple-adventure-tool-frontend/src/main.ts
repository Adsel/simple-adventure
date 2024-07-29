import { createApp } from 'vue'
import './index.css'
import App from "@/App.vue";
import {clientRouter} from "@/routing/router";

const app = createApp(App);

app.use(clientRouter);

app.mount('#app')
