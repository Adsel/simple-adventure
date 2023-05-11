<template>
    <router-view/>
</template>
<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import GameBoard from '@/pages/game/components/GameBoard.vue';

@Options({
    components: {
        GameBoard,
    }
})
export default class App extends Vue {
}
</script>
<style lang="scss">
@import './assets/styles/components/page/font';
@import './assets/styles/definitions/colors';

body {
    background-color: $color-background;
    color: $color-white;
    font-family: 'Chakra Petch', sans-serif;
    padding: 0;
    margin: 0;
}
</style>
