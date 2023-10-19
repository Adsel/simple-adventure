<template>
  <LobbyLayout>
    <h1>Choose character</h1>

    Logout ...
  </LobbyLayout>
</template>
<script lang="ts">

import LobbyLayout from "@/pages/shared/lobby-layout/LobbyLayout.vue";
import {onMounted} from "vue";

export default {
  name: 'LobbyC',
  components: {LobbyLayout},
  setup() {
    onMounted(() => {

    });

    return {};
  }
}
</script>
<style lang="scss" scoped>

</style>
