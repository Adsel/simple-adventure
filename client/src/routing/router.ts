import {createRouter, createWebHistory, Router, RouterOptions} from 'vue-router';
import {clientRoutes} from "@/routing/routes";

const routerOptions: RouterOptions = {
    history: createWebHistory(process.env.BASE_URL),
    routes: clientRoutes
};

export const clientRouter: Router = createRouter(routerOptions);
