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
