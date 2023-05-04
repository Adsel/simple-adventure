<template>
    <div class="board-panel__wrapper">
        <div class="board-panel__content">
            <form class="login-form__wrapper">
                <div class="input-text__wrapper">
                    <label for="nickname" class="input-text__label">Enter your nickname</label>
                    <input type="text" name="nickname" class="input-text__input" id="nickname" v-model="nicknameInput">
                </div>
                <div class="button__wrapper login-form__login-btn">
                    <input class="button__btn" type="submit" @click="login" value="Login">
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts">
import {ref} from "vue";
import {apiMethodLogin} from "@/api/auth/auth.api";
import {IAuthLoginResponse} from "@/interfaces/api/auth.interface";
import {saveIntoLocalStorage} from "@/pages/game/helpers/local-storage.helper";
import {LocalStorageKeyEnum} from "@/enums/local-storage-key.enum";

export default {
    name: 'LoginForm',
    emits: ['login-error', 'login-success'],
    setup(props: any, context: any) {
        const nicknameInput = ref('');

        const login = (event: Event) => {
            event.preventDefault();
            apiMethodLogin(nicknameInput.value).then((response: IAuthLoginResponse) => {
                if (!response.summoner_id) {
                    throw new Error('Missing data error');
                }

                saveIntoLocalStorage(LocalStorageKeyEnum.SummonerIdentifier, response.summoner_id);
                context.emit('login-success', response);
            }).catch((error: any) => {
                context.emit('login-error', error)
            });
        };

        return {nicknameInput, login};
    }
}
</script>
<style lang="scss">
@import "../../../../assets/styles/components/page/buttons";
@import "../../../../assets/styles/components/page/inputs";
@import "../../../../assets/styles/components/page/panels";

.login-form {
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  &__login-btn {
    margin-top: 1rem;
  }
}
</style>
