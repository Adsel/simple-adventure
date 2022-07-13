<template>
  <GameBoard></GameBoard>
</template>
<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import GameBoard from './game/components/game/GameBoard.vue';

@Options({
  components: {
    GameBoard,
  },
})
export default class App extends Vue {
}
</script>
<style lang="scss">
body {
  background-color: #3f3f3f;
  margin: 0;
}

canvas {
  margin: 5rem auto 0 auto;
  display: block;
}
</style>
