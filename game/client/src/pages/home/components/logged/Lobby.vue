<template>
  <LobbyLayout>
    <div class="board-panel__wrapper">
      <div class="board-panel__content">
        <div class="choosing-character__wrapper">
          <h1>
            {{ $t('characters.headers.choose') }}
          </h1>
          <div class="choosing-character__list" v-if="summoners">
            <span v-if="summoners.length <= 0">
              {{ $t('generic.empty') }}
            </span>
            <LobbySummoner class="choosing-character__list-item choosing-character__list-item--secondary"
                           :summoner="renderedList.prev ? renderedList.prev : null"></LobbySummoner>
            <LobbySummoner class="choosing-character__list-item"
                           :current="true"
                           :summoner="renderedList.current ? renderedList.current : null"></LobbySummoner>
            <LobbySummoner class="choosing-character__list-item choosing-character__list-item--secondary"
                           :summoner="renderedList.next ? renderedList.next : null"></LobbySummoner>
          </div>
          <div class="choosing-character__nav">
            <img src="@/assets/icons/character-switcher/switch-arrow-left.svg"
                 class="choosing-character__switch-icon choosing-character__switch-icon--left"
                 width="32"
                 height="32"
                 alt="Switch arrow left"
                 @click="changeSummoner(-1)"/>
            <img src="@/assets/icons/character-switcher/switch-arrow-right.svg"
                 class="choosing-character__switch-icon choosing-character__switch-icon--right"
                 width="32"
                 height="32"
                 alt="Switch arrow right"
                 @click="changeSummoner()"/>
          </div>
        </div>
        <div>
          <SimpleButton text="+" @click="onLogout"></SimpleButton>
          <SimpleButton :text="$t('nav.items.play')" type="success" @click="onChooseCharacter"></SimpleButton>
          <SimpleButton :text="$t('auth.headers.logout')" @click="onLogout"></SimpleButton>
        </div>
      </div>
    </div>
  </LobbyLayout>
</template>
<script lang="ts">
import LobbyLayout from "@/pages/shared/lobby-layout/LobbyLayout.vue";
import {onMounted, ref} from "vue";
import SimpleButton from "@/pages/shared/components/buttons/SimpleButton.vue";
import {Routes} from "@/enums/routing/routes.enum";
import {useRouter} from "vue-router";
import {saveIntoLocalStorage} from "@/pages/game/helpers/local-storage.helper";
import {LocalStorageKeyEnum} from "@/enums/local-storage-key.enum";
import {apiMethodGetSummoners} from "@/api/summoner/summoner.api";
import {IGetSummonersResponse} from "@/interfaces/api/summoner.interface";
import {ISummoner, ISummonerChoosingList} from "@/interfaces/player/summoner.interface";
import LobbySummoner from "@/pages/home/components/logged/LobbySummoner.vue";

export default {
  name: 'LobbyC',
  components: {LobbySummoner, SimpleButton, LobbyLayout},
  setup() {
    const router = useRouter();
    const summoners: any = ref<Array<ISummoner>>([]);
    const renderedList: any = ref<ISummonerChoosingList>({});
    const currentSummonerIndex = ref(0);

    onMounted(() => {
      apiMethodGetSummoners(2).then((response: IGetSummonersResponse) => {
        summoners.value = response.summoners;
        loadSummonersToDisplay();
      }).catch((error: Error) => {
        console.error(error);
      })
    });

    const changeSummoner = (direction: number = 1) => {
      if (summoners.value.length <= 1) {
        return;
      }

      if (direction > 0) {
        if (currentSummonerIndex.value + direction < summoners.value.length) {
          currentSummonerIndex.value += direction;
        } else {
          currentSummonerIndex.value = 0;
        }
      } else {
        if (currentSummonerIndex.value + direction >= 0) {
          currentSummonerIndex.value += direction;
        } else {
          currentSummonerIndex.value = summoners.value.length - 1;
        }
      }

      loadSummonersToDisplay();
    };

    const loadSummonersToDisplay = () => {
      const index = currentSummonerIndex.value;
      const listObject: ISummonerChoosingList = {
        current: summoners.value[index]
      };

      if (summoners.value.length > 1) {
        const prevIndex = index - 1 >= 0 ? index - 1 : summoners.value.length - 1;
        listObject.prev = summoners.value[prevIndex] ? summoners.value[prevIndex] : null;
      }

      if (summoners.value.length > 2) {
        const nextIndex = index + 1 < summoners.value.length ? index + 1 : 0;
        listObject.next = summoners.value[nextIndex] ? summoners.value[nextIndex] : null;
      }

      renderedList.value = listObject;
    };

    const onLogout = () => {
      saveIntoLocalStorage(LocalStorageKeyEnum.AuthToken, null);
      router.push(Routes.Home);
    };

    const onChooseCharacter = () => {
      saveIntoLocalStorage(LocalStorageKeyEnum.SummonerIdentifier, summoners.value[currentSummonerIndex.value].summoner_id);
      router.push(Routes.Game);
    };

    return {
      renderedList,
      summoners,
      changeSummoner,
      onChooseCharacter,
      onLogout
    };
  }
}
</script>
<style lang="scss" scoped>
@import 'lobby';
</style>
