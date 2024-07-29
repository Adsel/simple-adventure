<template>
  <LobbyLayout>
    <router-view/>
  </LobbyLayout>
</template>
<script lang="ts">
// TODO:
// split into Template component (reusable - one import styles)
import 'vue3-toastify/dist/index.css';
import LobbyLayout from "@/pages/shared/lobby-layout/LobbyLayout.vue";

export default {
  name: 'LobbyPage',
  components: {LobbyLayout},
  setup() {

    return {
    };
  }
}
</script>
