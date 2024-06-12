<template>
  <div>
    <nav class="lobby-navbar__nav">
      <GameTitle/>
      <div class="mobile-menu__wrapper" @click="toggleMenu()">
        <div class="mobile-menu__item"></div>
        <div class="mobile-menu__item"></div>
        <div class="mobile-menu__item"></div>
      </div>
      <ul id="navMenu" class="desktop-menu__wrapper">
        <li class="desktop-menu__item">
          <a href="#" class="desktop-menu__link">
            <img src="@/assets/icons/nav/icon-play-24x24.svg"
                 class=""
                 width="48"
                 height="48"
                 alt="Play icon"/>
            Play
          </a>
        </li>
        <li class="desktop-menu__item">
          <a href="#" class="desktop-menu__link">
            <img src="@/assets/icons/nav/icon-knowledge-book-24x24.svg"
                 class=""
                 width="48"
                 height="48"
                 alt="Book icon"/>
            Knowledge Base
          </a>
        </li>
        <li class="desktop-menu__item">
          <a href="#" class="desktop-menu__link">
            <img src="@/assets/icons/nav/icon-scrolled-script-24x24.svg"
                 class=""
                 width="48"
                 height="48"
                 alt="Book icon"/>
            Documentation
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script lang="ts">
import GameTitle from "@/pages/shared/game-title/GameTitle.vue";

export default {
  name: 'LobbyNav',
  components: {GameTitle},
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
