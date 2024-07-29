<template>
  <div class="page__nav">
    <LobbyNav/>
  </div>
  <div class="page__wrapper">
    <slot/>
  </div>
</template>
<script setup lang="ts">
import LobbyNav from "@/pages/shared/lobby-layout/nav/LobbyNav.vue";
</script>
<style lang="scss">
@import "../../../assets/styles/definitions/toastify";
@import "../../../assets/styles/definitions/colors";

.page {
  &__wrapper {
    margin-top: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
