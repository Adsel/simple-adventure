<template>
    <canvas ref="gameBoardRef" :width="GAME_CONFIG.width" :height="GAME_CONFIG.height"></canvas>
</template>
<script lang="ts">
import {onMounted, ref} from "vue";
import {GAME_CONFIG} from "@/config/game.config";
import {loadBackgroundImage, loadCharacterImage} from "@/pages/game/helpers/drawing.helper";
import {prepareAndGetContext} from "@/pages/game/helpers/board.helper";
import {getSocketClientInstance} from "@/socket/shared/instance";

export default {
    name: 'GameBoard',
    setup() {
        let gameContext: any = null;
        const gameBoardRef = ref(null);

        onMounted(() => {
            getSocketClientInstance();
            loadGame();
        });

        const drawBackground = () => {
            // TODO:
            // split into location object
            const imageSource = 'backgrounds/Sprite-background-0001.png';

            loadBackgroundImage(gameContext, imageSource);
        };

        const drawCharacter = () => {
            // TODO:
            // split into character object
            const imageSource = 'characters/Sprite-character-0001.png';

            // TODO:
            // read coordinates
            loadCharacterImage(gameContext, imageSource, 32, 32);
        };

        const loadGame = () => {
            gameContext = prepareAndGetContext(gameBoardRef.value);
            drawBackground();
            drawCharacter();
        };
        return {GAME_CONFIG, gameBoardRef};
    }
}
</script>
<style lang="scss">
@import 'game-board-definitions';

body {
  background-color: $colorBackgroundBoard;
  margin: 0;
}

canvas {
  display: block;
  width: $gameBoardX;
  height: $gameBoardY;
  margin: auto;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
