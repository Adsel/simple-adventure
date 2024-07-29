import {INavItem} from "@/interfaces/nav/items.interface";

export const NAV_ITEMS: INavItem[] = [
    {
        img: 'icon-play-24x24.svg',
        link: '/',
        name: 'lobby-nav.items.play'
    },
    {
        img: 'icon-knowledge-book-24x24.svg',
        link: '/knowledge-base',
        name: 'lobby-nav.items.knowledge-base'
    },
    {
        img: 'icon-scrolled-script-24x24.svg',
        link: '/documentation',
        name: 'lobby-nav.items.documentation'
    }
];
