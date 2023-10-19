<template>
  <div class="page__wrapper">
    <GameTitle></GameTitle>
    <slot/>
  </div>
</template>
<script setup lang="ts">
import GameTitle from "@/pages/shared/game-title/GameTitle.vue";
</script>
<style lang="scss">
@import "../../../assets/styles/definitions/toastify";
@import "../../../assets/styles/definitions/colors";

.page {
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
