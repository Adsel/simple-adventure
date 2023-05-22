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
import {loadImage} from "@/pages/game/helpers/drawing.helper";
import {prepareAndGetContext} from "@/pages/game/helpers/board.helper";
import {getSocketClientInstance} from "@/socket/shared/instance";
import GameBoardLoader from "@/pages/game/components/game-loaders/GameBoardLoader.vue";
import {Character} from "@/models/character.class";
import {Localization} from "@/models/localization.class";
import {MainCharacter} from "@/models/main.character.class";

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
        let characterPlaceholderImg: HTMLImageElement;
        let character: MainCharacter;
        let localization: Localization;
        let bgImage: HTMLImageElement;
        // const graphicsMap = new Map<string, HTMLImageElement>();
        const playersMap = new Map<string, Character>();

        const onInitialDataLoaded = (data: any) => loadGame(data);
        const onPlayersMovement = (data: any) => {
            if (!data || !data.players) {
                return;
            }

            data.players.forEach((player: any) => {
                if (playersMap.has(player.summonerId)) {
                    let playerData = playersMap.get(player.summonerId);
                    if (!playerData) {
                        return;
                    }
                }
            });
        };
        const onAnotherPlayerConnected = (data: any) => {
            if (!data || !data.player) {
                return;
            }

            const anotherPlayer = data.player;
            const summonerId = data.summonerId;
            if (!playersMap.has(summonerId)) {
                playersMap.set(summonerId, new Character(gameContext, anotherPlayer.characterImage, characterPlaceholderImg, socketInstance, anotherPlayer.x, anotherPlayer.y, localization));
            }
        };

        const onAnotherPlayerMoved = (data: any) => {
            if (!data || !data.anotherPlayer) {
                return;
            }

            const anotherPlayer = data.anotherPlayer;

            const anotherPlayerData = playersMap.get(anotherPlayer.summonerId);
            if (!anotherPlayerData) {
                return;
            }

            anotherPlayerData.setPositionX(anotherPlayer.x);
            anotherPlayerData.setPositionY(anotherPlayer.y);
        };

        const onAnotherPlayerDisconnected = (data: any) => {
            if (!data || !data.summonerId) {
                return;
            }

            playersMap.delete(data.summonerId);
        };

        const gameLoop = (data: any) => {
            gameContext.clearRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);
            localization.drawBackground();
            character.animationFrame();
            playersMap.forEach((character: Character) => character.animationFrame());
            window.requestAnimationFrame(() => gameLoop(data));
        };

        const loadGame = async (data: any) => {
            const characterImage = data.summoner.characterImage;
            gameContext = prepareAndGetContext(gameBoardRef.value);
            await loadBackground(data.location);
            loadingProgress.value = 25;
            // loadingStage.value = 1;
            // drawBackground(data.backgroundImage);
            characterPlaceholderImg = await loadImage('characters/Sprite-character-placeholder.png');
            character = new MainCharacter(gameContext, characterImage, characterPlaceholderImg, socketInstance, data.summoner.x, data.summoner.y, localization);
            loadingProgress.value = 50;
            // loadingStage.value = 2;
            data.players.forEach((player: any) => playersMap.set(player.summonerId, new Character(
                gameContext, player.characterImage, characterPlaceholderImg, socketInstance, player.x, player.y, localization
            )));

            // drawCharacter(data.characterImage, data.xPos, data.yPos);
            loadingProgress.value = 75;
            // loadingStage.value = 3;
            loadingProgress.value = 100;
            // loadingStage.value = 4;
            isLoadingState.value = false;

            window.requestAnimationFrame(() => gameLoop(data));
        };

        const loadBackground = async (location: any): Promise<void> => {
            bgImage = await loadImage(location.backgroundImage);
            localization = new Localization(bgImage, gameContext, location.width, location.height);
        };

        return {
            GAME_CONFIG,
            gameBoardRef,
            isLoadingState,
            loadingStage,
            loadingProgress,
            onAnotherPlayerConnected,
            onAnotherPlayerDisconnected,
            onAnotherPlayerMoved,
            onInitialDataLoaded,
            onPlayersMovement
        };
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
