<template>
  <GameBoardLoader v-if="isLoadingState"
                   :progress-value="loadingProgress"
                   :loading-stage="loadingStage"></GameBoardLoader>
  <div class="game-board__overlay">
    <div class="game-board-header-top__wrapper">
      Graczy: {{ playersCount }}
    </div>
    <div class="game-board__center">
      <div class="game-board__left-column">
      </div>
      <div class="game-board__wrapper">
        <canvas ref="gameBoardBackgroundRef"
                :width="GAME_CONFIG.width"
                :height="GAME_CONFIG.height"
                class="game-board__canvas game-board__canvas--background"></canvas>
        <canvas ref="gameBoardRef"
                :width="GAME_CONFIG.width"
                :height="GAME_CONFIG.height"
                class="game-board__canvas game-board__canvas--foreground"></canvas>
      </div>
      <div class="game-board__right-column">
        <div class="game-board__stats-header" v-if="summonerData.summonerNick">
          {{ summonerData.summonerNick }}
        </div>
        <div class="game-board__stats-desc">
          <span>Lvl. {{ +summonerData.summonerLevel }}</span>
          <span>
            {{ +summonerData.summonerExp + ' / ' + (+summonerData.summonerExpToUp) }}
          </span>
        </div>
      </div>
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
    let gameContextBackground: any = null;
    let gameContextForeground: any = null;
    const gameBoardRef = ref(null);
    const gameBoardBackgroundRef = ref(null);
    const isLoadingState = ref(true);
    const loadingProgress = ref(0);
    const loadingStage = ref(0);
    const playersCount = ref(1);
    const summonerData = ref({
      characterImage: '',
      x: 0,
      y: 0,
      summonerExpToUp: 0,
      summonerExp: 0,
      summonerLevel: 0,
      summonerNick: ''
    });

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
        playersCount.value += 1;
        playersMap.set(summonerId, new Character(gameContextForeground, anotherPlayer.characterImage, characterPlaceholderImg, socketInstance, anotherPlayer.x, anotherPlayer.y, localization));
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

      playersCount.value -= 1;
      playersMap.delete(data.summonerId);
    };

    const gameLoop = (data: any) => {
      // TODO:
      // [optimization]
      // repaint only when changes
      gameContextBackground.clearRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);
      gameContextForeground.clearRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);
      localization.drawBackground();
      character.drawFogOfWar();
      character.animationFrame();
      playersMap.forEach((character: Character) => character.animationFrame());
      window.requestAnimationFrame(() => gameLoop(data));
    };

    // TODO:
    // interface for `data`
    const loadGame = async (data: any) => {
      summonerData.value = data.summoner;
      if (!summonerData.value) {
        return;
      }


      const characterImage = summonerData.value.characterImage;
      gameContextForeground = prepareAndGetContext(gameBoardRef.value);
      gameContextBackground = prepareAndGetContext(gameBoardBackgroundRef.value);
      await loadBackground(data.location);
      loadingProgress.value = 25;
      // loadingStage.value = 1;
      // drawBackground(data.backgroundImage);
      characterPlaceholderImg = await loadImage('characters/Sprite-character-placeholder.png');

      const mainCharacterX = summonerData.value.x;
      const mainCharacterY = summonerData.value.y;
      localization.setMainCharacterX(mainCharacterX);
      localization.setMainCharacterY(mainCharacterY);
      character = new MainCharacter(gameContextForeground, characterImage, characterPlaceholderImg, socketInstance, mainCharacterX, mainCharacterY, localization);
      loadingProgress.value = 50;
      // loadingStage.value = 2;

      playersCount.value = data.players.length + 1;
      data.players.forEach((player: any) => playersMap.set(player.summonerId, new Character(
          gameContextForeground, player.characterImage, characterPlaceholderImg, socketInstance, player.x, player.y, localization
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
      localization = new Localization(bgImage, gameContextBackground, location.width, location.height);
    };

    return {
      GAME_CONFIG,
      gameBoardRef,
      gameBoardBackgroundRef,
      isLoadingState,
      loadingStage,
      loadingProgress,
      playersCount,
      summonerData,
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
@import 'game-board';
</style>
