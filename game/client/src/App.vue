<template>
  <router-view/>
  <LobbyLoader v-if="isLoadingState"/>
</template>
<script lang="ts">
import LobbyLoader from "@/pages/shared/lobby-layout/LobbyLoader.vue";
import {defineComponent, onMounted, ref} from "vue";
import {GLOBAL_EVENTS_HANDLER} from "@/constants/global-events";
import {GlobalEventType} from "@/enums/events/global-event-type.enum";
import {IGlobalLoadingStateEvent} from "@/interfaces/events/global-events/global-loading-state.interface";
import {ICustomEvent} from "@/interfaces/events/custom-event.interface";

export default defineComponent({
  components: {
    LobbyLoader
  },
  name: "App",
  setup() {
    const isLoadingState = ref(false);

    onMounted(() => {
      GLOBAL_EVENTS_HANDLER.appendCallback(GlobalEventType.LoaderToggle, (event: ICustomEvent<IGlobalLoadingStateEvent>) => {
       console.log('CALLBACK', event.detail);
        isLoadingState.value = event.detail.isLoadingState;
      });
    });

    return {
      isLoadingState
    };
  },
});
</script>
<style lang="scss">
@import './assets/styles/components/page/font';
@import './assets/styles/definitions/colors';

body {
  background-color: $color-background;
  color: $color-white;
  font-family: 'Chakra Petch', sans-serif;
  padding: 0;
  margin: 0;
}
</style>
