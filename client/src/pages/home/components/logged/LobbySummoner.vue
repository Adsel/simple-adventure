<template>
  <div v-if="summoner">
    <span>{{ summoner.summoner_nickname }}</span>
    <img :src="require('@/assets/' + summoner.summoner_outfit)"
         class="lobby-summoner__image"
         alt="Summoner's outfit"/>
    <div :style="{'background': 'url(@/assets/' + summoner.summoner_outfit + ')'}"></div>
    Level: {{ summoner.summoner_level }}
    ({{ summoner.summoner_experience }} / {{ summoner.summoner_experience_to_up }})
  </div>
</template>
<script lang="ts">
import {PropType} from "vue";
import {ISummoner} from "@/interfaces/player/summoner.interface";

export default {
  name: 'LobbySummoner',
  props: {
    summoner: {
      type: Object as PropType<ISummoner>,
      required: false,
      default: null,
    },
    current: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  setup() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../assets/styles/definitions/images";
@import "../../../../assets/styles/definitions/units";

.lobby-summoner {
  &__image {
    @include pixelArtImage();
    clip: rect(0, $px-16, $px-16, 0);
    position: absolute;
    top: $px-48;
    transform: scale(4);
    left: calc(256px / 2);
  }
}
</style>
