<template>
  <canvas ref="gameBoardRef" :width="GAME_CONFIG.width" :height="GAME_CONFIG.height"></canvas>
</template>
<script lang="ts">
import {onMounted, ref} from "vue";
import {GAME_CONFIG} from "@/config/game.config";
import {loadBackgroundImage} from "@/game/helpers/drawing.helper";
import {prepareAndGetContext} from "@/game/helpers/board.helper";

export default {
  name: 'GameBoard',
  setup() {
    let gameContext: any = null;
    const gameBoardRef = ref(null);

    onMounted(() => {
      loadGame();
    });

    const loadBackground = () => {
      const imageSource = require('../../../assets/backgrounds/background-grass-01.png');

      loadBackgroundImage(gameContext, imageSource);
    };

    const loadGame = () => {
      gameContext = prepareAndGetContext(gameBoardRef.value);
      loadBackground();
    };
    return {GAME_CONFIG, gameBoardRef};
  }
}
</script>
<style lang="scss">
canvas {
  // TODO:
  // adjust width and height to FULL HD ratio
  width: 1280px;
  height: 1280px;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
