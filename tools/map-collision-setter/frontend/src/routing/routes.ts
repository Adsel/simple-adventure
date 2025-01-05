import {RouteRecordRaw} from 'vue-router';
import {RoutesEnum} from "@/enums/routing/routes.enum";

export const clientRoutes: Readonly<RouteRecordRaw[]> = [
    {
        path: RoutesEnum.Dashboard,
        name: 'HomePage',
        component: () => import(/* webpackChunkName: "dashboard-page" */ '@/components/pages/DashboardPage.vue'),
    },
    {
        path: RoutesEnum.MapsManagement,
        name: 'MapsManagement',

        component: () => import(/* webpackChunkName: "maps-management-page" */ '@/components/pages/MapsManagementPage.vue'),
    }
];
