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
        <li class="desktop-menu__item">
          <RouterLink to="/" class="desktop-menu__link">
            <img src="@/assets/icons/nav/icon-play-24x24.svg"
                 class=""
                 width="48"
                 height="48"
                 alt="Play icon"/>
            Play
          </RouterLink>
        </li>
        <li class="desktop-menu__item">
          <RouterLink to="/knowledge-base" class="desktop-menu__link">
            <img src="@/assets/icons/nav/icon-knowledge-book-24x24.svg"
                 class=""
                 width="48"
                 height="48"
                 alt="Book icon"/>
            Knowledge Base
          </RouterLink>
        </li>
        <li class="desktop-menu__item">
          <RouterLink to="/documentation" class="desktop-menu__link">
            <img src="@/assets/icons/nav/icon-scrolled-script-24x24.svg"
                 class=""
                 width="48"
                 height="48"
                 alt="Book icon"/>
            Documentation
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script lang="ts">
import GameTitle from "@/pages/shared/game-title/GameTitle.vue";
import LangSwitcher from "@/pages/shared/components/nav/LangSwitcher.vue";

export default {
  name: 'LobbyNav',
  components: {
    LangSwitcher,
    GameTitle
  },
  setup() {
    const toggleMenu = () => {
      alert('TODO: toggle mobile menu')
    };

    return {
      toggleMenu
    }
  }
}
</script>
<style scoped lang="scss">
@import 'lobby-nav';
</style>
