<template>
    <GameBoardLoader v-if="isLoadingState"
                     :progress-value="loadingProgress"
                     :loading-stage="loadingStage"></GameBoardLoader>
    <div class="game-board__overlay">
        <div class="game-board__wrapper">
            <canvas ref="gameBoardRef"
                    :width="GAME_CONFIG.width"
                    :height="GAME_CONFIG.height"
                    class="game-board__canvas"></canvas>
        </div>
    </div>
</template>
<script lang="ts">
import {ref} from "vue";
import {GAME_CONFIG} from "@/config/game.config";
import {drawBackgroundImage, loadImage} from "@/pages/game/helpers/drawing.helper";
import {prepareAndGetContext} from "@/pages/game/helpers/board.helper";
import {getSocketClientInstance} from "@/socket/shared/instance";
import GameBoardLoader from "@/pages/game/components/game-loaders/GameBoardLoader.vue";
import {Character} from "@/models/character.class";

let socketInstance: any;

export default {
    name: 'GameBoard',
    components: {
        GameBoardLoader
    },
    mounted() {
        socketInstance = getSocketClientInstance(this);
    },
    setup() {
        let gameContext: any = null;
        const gameBoardRef = ref(null);
        const isLoadingState = ref(true);
        const loadingProgress = ref(0);
        const loadingStage = ref(0);
        let character: Character;
        let bgImage: HTMLImageElement;

        const onInitialDataLoaded = (data: any) => loadGame(data);
        const drawBackground = () => {
            drawBackgroundImage(gameContext, bgImage, {
                posX: 0,
                posY: 0,
                width: GAME_CONFIG.width,
                height: GAME_CONFIG.height,
            });
        };

        const gameLoop = (data: any) => {
            gameContext.clearRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);
            drawBackground();
            character.animationFrame();
            window.requestAnimationFrame(() => gameLoop(data));
        };

        const loadGame = async (data: any) => {
            gameContext = prepareAndGetContext(gameBoardRef.value);
            loadingProgress.value = 25;
            // loadingStage.value = 1;
            // drawBackground(data.backgroundImage);
            const characterImage = await loadImage(data.characterImage);
            character = new Character(gameContext, characterImage, socketInstance);
            loadingProgress.value = 50;
            // loadingStage.value = 2;

            bgImage = await loadImage(data.backgroundImage);
            // drawCharacter(data.characterImage, data.xPos, data.yPos);
            loadingProgress.value = 75;
            // loadingStage.value = 3;
            loadingProgress.value = 100;
            // loadingStage.value = 4;
            isLoadingState.value = false;

            window.requestAnimationFrame(() => gameLoop(data));
        };

        return {GAME_CONFIG, gameBoardRef, isLoadingState, loadingStage, loadingProgress, onInitialDataLoaded};
    }
}
</script>
<style lang="scss">
@import '../../../assets/styles/definitions/game-board-definitions';
@import '../../../assets/styles/definitions/colors';

.game-board {
  &__overlay {
    background-color: $color-background;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
  }

  &__wrapper {
    background-color: $color-primary-2;
    border: 3px solid $color-black;
    padding: $gamePadding;
    border-radius: 10px;
    width: calc(#{$gameBoardX} + (2 * #{$gamePadding}));
    height: calc(#{$gameBoardY} + (2 * #{$gamePadding}));
  }

  &__canvas {
    display: block;
    width: $gameBoardX;
    height: $gameBoardY;
    margin: $gamePadding;
    outline: 3px solid $color-black;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }
}
</style>
