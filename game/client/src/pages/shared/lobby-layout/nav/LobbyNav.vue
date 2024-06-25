<template>
  <div>
    <nav class="lobby-navbar__nav">
      <GameTitle/>
      <LangSwitcher/>
      <div class="mobile-menu__wrapper" @click="toggleMenu()">
        <div class="mobile-menu__item"></div>
        <div class="mobile-menu__item"></div>
        <div class="mobile-menu__item"></div>
      </div>
      <ul id="navMenu" class="desktop-menu__wrapper">
        <li class="desktop-menu__item"
            v-for="(navItem, index) in navItems"
            :key="index">
          <RouterLink :to="navItem.link"
                      class="desktop-menu__link">
            <img :src="require('@/assets/icons/nav/' + navItem.img)"
                 class=""
                 width="48"
                 height="48"
                 alt="Play icon"/>
            {{ $t(navItem.name) }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script lang="ts">
import GameTitle from "@/pages/shared/game-title/GameTitle.vue";
import LangSwitcher from "@/pages/shared/components/nav/LangSwitcher.vue";
import {ref} from "vue";
import {INavItem} from "@/interfaces/nav/items.interface";
import {NAV_ITEMS} from "@/constants/nav/items.constant";

export default {
  name: 'LobbyNav',
  components: {
    LangSwitcher,
    GameTitle
  },
  setup() {
    const navItems = ref<INavItem[]>(NAV_ITEMS);

    const toggleMenu = () => {
      alert('TODO: toggle mobile menu')
    };

    return {
      navItems,
      toggleMenu
    }
  }
}
</script>
<style scoped lang="scss">
@import 'lobby-nav';
</style>
