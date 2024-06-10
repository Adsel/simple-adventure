<template>
  <div v-if="summoner">
    <div :style="{'backgroundImage': 'url(' + require('@/assets/' + summoner.summoner_outfit) + ')'}"
         class="lobby-summoner__image"
         :class="{'lobby-summoner__image--active': current}"></div>
    <div>
      <span>{{ summoner.summoner_nickname }}</span>
      &nbsp;
      <span>Level: {{ summoner.summoner_level }}</span>
    </div>
    <div>({{ summoner.summoner_experience }} / {{ summoner.summoner_experience_to_up }})</div>
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
@import "../../../../assets/styles/definitions/colors";
@import "../../../../assets/styles/definitions/images";
@import "../../../../assets/styles/definitions/units";

.lobby-summoner {
  $size: $px-16;
  &__image {
    @include pixelArtImage();

    position: absolute;
    top: -$px-32;
    left: calc(50% - #{$px-8});
    background-size: $px-64 $px-64;
    height: $size;
    width: $size;
    transform: scale(4);

    &--active {
      filter: drop-shadow(0 0 $px-2 $color-primary-3);
    }
  }
}
</style>
