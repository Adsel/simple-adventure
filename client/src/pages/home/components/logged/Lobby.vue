<template>
  <LobbyLayout>
    <div class="board-panel__wrapper">
      <div class="board-panel__content">
        <div class="choosing-character__wrapper">
          <h1>Choose character</h1>
          <div class="choosing-character__list" v-if="summoners">
            <span v-if="summoners.length <= 0">
              Empty
            </span>
            <div v-for="summoner of summoners"
                 :key="summoner.summoner_id"
                 class="choosing-character__list">
              {{ summoner }}
              <img :src="require('@/assets/' + summoner.summoner_outfit)"/>
              <div :style="{'background': 'url(@/assets/' + summoner.summoner_outfit + ')'}"></div>
            </div>
          </div>
          <SimpleButton text="+" @click="onLogout"></SimpleButton>
          <SimpleButton text="Logout" @click="onLogout"></SimpleButton>
        </div>
      </div>
    </div>
  </LobbyLayout>
</template>
<script lang="ts">
import LobbyLayout from "@/pages/shared/lobby-layout/LobbyLayout.vue";
import {onMounted, ref} from "vue";
import SimpleButton from "@/pages/shared/components/buttons/SimpleButton.vue";
import {RoutesEnum} from "@/enums/routing/routes.enum";
import {useRouter} from "vue-router";
import {saveIntoLocalStorage} from "@/pages/game/helpers/local-storage.helper";
import {LocalStorageKeyEnum} from "@/enums/local-storage-key.enum";
import {apiMethodGetSummoners} from "@/api/summoner/summoner.api";
import {IGetSummonersResponse} from "@/interfaces/api/summoner.interface";
// import {ISummoner} from "@/interfaces/player/summoner.interface";

export default {
  name: 'LobbyC',
  components: {SimpleButton, LobbyLayout},
  setup() {
    const router = useRouter();
    // ISummoner[]
    const summoners: any = ref([]);

    onMounted(() => {
      apiMethodGetSummoners(2).then((response: IGetSummonersResponse) => {
        summoners.value = response.summoners;
      }).catch((error: Error) => {
        console.error(error);
      })
    });

    const onLogout = () => {
      saveIntoLocalStorage(LocalStorageKeyEnum.AuthToken, null);
      router.push(RoutesEnum.Home);
    };

    return {
      summoners,
      onLogout
    };
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../assets/styles/components/page/inputs";
@import "../../../../assets/styles/components/page/panels";
@import "../../../../assets/styles/definitions/units";
</style>
