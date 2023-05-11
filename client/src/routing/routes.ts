import {RouteRecordRaw} from 'vue-router';

export const clientRoutes: Readonly<RouteRecordRaw[]> = [
    {
        path: '/',
        name: 'HomePage',
        component: () => import(/* webpackChunkName: "home-page" */ '@/pages/home/components/HomePage.vue'),
    },
    {
        path: '/game',
        name: 'GameBoard',
        component: () => import(/* webpackChunkName: "game-board" */ '@/pages/game/components/GameBoard.vue'),
    },
];
