<template>
    <h1 class="game__title">
        <img src="@/assets/logotype.png"
             width="32"
             height="32"
             alt="Simple Adventure logotype"
             class="pixel-image__img">
        Simple Adventure
    </h1>
</template>
<script lang="ts">

export default {
    name: 'GameTitle',
    setup() {
    }
}
</script>
<style scoped lang="scss">
@import "../../../assets/styles/components/page/pixeled-image";
@import "../../../assets/styles/definitions/units";

.game {
  &__title {
    display: flex;
    gap: $px-10;
    align-items: center;
  }
}
</style>
