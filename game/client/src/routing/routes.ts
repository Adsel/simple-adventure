import {RouteRecordRaw} from 'vue-router';
import {Routes} from "@/enums/routing/routes.enum";

export const clientRoutes: Readonly<RouteRecordRaw[]> = [
    {
        path: Routes.Home,
        name: 'LobbyPage',
        component: () => import(/* webpackChunkName: "home-page" */ '@/pages/home/components/LobbyPage.vue'),
        children: [
            {
                path: Routes.Home,
                name: 'HomePage',
                component: () => import(/* webpackChunkName: "home-lobby" */ '@/pages/home/components/HomePage.vue'),
            },
            {
                path: Routes.Lobby,
                name: 'Lobby',
                component: () => import(/* webpackChunkName: "game-lobby" */ '@/pages/home/components/logged/Lobby.vue'),
            },
            {
                path: Routes.KnowledgeBase,
                name: 'KnowledgeBase',
                component: () => import(/* webpackChunkName: "game-knowledge" */ '@/pages/home/components/knowledge-base/MainComponent.vue'),
            },
            {
                path: Routes.Documentation,
                name: 'DocumentationBase',
                component: () => import(/* webpackChunkName: "game-docs" */ '@/pages/home/components/documentation/MainComponent.vue'),
            },
        ]
    },
    {
        path: Routes.Game,
        name: 'GameBoard',
        component: () => import(/* webpackChunkName: "game-board" */ '@/pages/game/components/GameBoard.vue'),
    },
];
