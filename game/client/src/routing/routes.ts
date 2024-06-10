import {RouteRecordRaw} from 'vue-router';
import {RoutesEnum} from "@/enums/routing/routes.enum";

export const clientRoutes: Readonly<RouteRecordRaw[]> = [
    {
        path: '/',
        name: 'HomePage',
        component: () => import(/* webpackChunkName: "home-page" */ '@/pages/home/components/HomePage.vue'),
    },
    {
      path: RoutesEnum.Lobby,
      name: 'Lobby',
        component: () => import(/* webpackChunkName: "game-lobby" */ '@/pages/home/components/logged/Lobby.vue'),
    },
    {
        path: '/game',
        name: 'GameBoard',
        component: () => import(/* webpackChunkName: "game-board" */ '@/pages/game/components/GameBoard.vue'),
    },
];
