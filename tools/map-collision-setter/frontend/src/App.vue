<template>
  <div>
    <SideMenu></SideMenu>
    <div class="p-4 sm:ml-64">
      <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <router-view></router-view>
      </div>
    </div>
    <LoaderComponent v-if="isLoadingState"></LoaderComponent>
  </div>
</template>
<script lang="ts">
import SideMenu from "@/components/partials/side-menu/SideMenu.vue";
import LoaderComponent from "@/components/core/Loader.vue";
import {onMounted, ref} from "vue";
import {GLOBAL_EVENTS_HANDLER} from "@/constants/global-events";
import {GlobalEventType} from "@/enums/events/global-event-type.enum";
import {ICustomEvent} from "@/interfaces/events/custom-event.interface";
import {IGlobalLoadingStateEvent} from "@/interfaces/events/global-events/global-loading-state.interface";

export default {
  name: 'App',
  components: {
    LoaderComponent,
    SideMenu
  },
  setup() {
    const isLoadingState = ref(false);

    onMounted(() => {
      GLOBAL_EVENTS_HANDLER.appendCallback(GlobalEventType.LoaderToggle, (event: ICustomEvent<IGlobalLoadingStateEvent>) => {
        isLoadingState.value = event.detail.isLoadingState;
      });
    });

    return {
      isLoadingState
    }
  }
}
</script>
<style>
</style>
