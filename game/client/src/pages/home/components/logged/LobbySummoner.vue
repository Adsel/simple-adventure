<template>
  <div v-if="summoner">
    <div :style="{'backgroundImage': 'url(' + require('@/assets/' + summoner.summoner_outfit) + ')'}"
         class="lobby-summoner__image"
         :class="{'lobby-summoner__image--active': current}"></div>
    <div>
      <span>{{ summoner.summoner_nickname }}</span>
      &nbsp;
      <span>{{ $t('generic.level') }}: {{ summoner.summoner_level }}</span>
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
@import 'lobby-summoner';
</style>
