<template>
  <div>
    <nav class="lobby-navbar__nav">
      <GameTitle/>
      <div class="mobile-menu__wrapper" onclick="toggleMenu()">
        <div class="mobile-menu__item"></div>
        <div class="mobile-menu__item"></div>
        <div class="mobile-menu__item"></div>
      </div>
      <ul id="navMenu" class="desktop-menu__wrapper">
        <li class="desktop-menu__item">
          <a href="#" class="desktop-menu__link">Play</a>
        </li>
        <li class="desktop-menu__item">
          <a href="#" class="desktop-menu__link">Knowledge Base</a>
        </li>
        <li class="desktop-menu__item">
          <a href="#" class="desktop-menu__link">Documentation</a>
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

  }
}
</script>
<style scoped lang="scss">
@import 'lobby-nav';
</style>
