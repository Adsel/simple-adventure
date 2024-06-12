<template>
  <div class="input-text__wrapper">
    <label for="login" class="input-text__label">Enter your Login</label>
    <input type="text" name="login" class="input-text__input" id="login" v-model="loginInput">
  </div>
  <div class="input-text__wrapper">
    <label for="password" class="input-text__label">Enter your Password</label>
    <input :type="showPassword ? 'text' : 'password'"
           name="password"
           class="input-text__input input-text__input--icon"
           id="password"
           v-model="passwordInput">
    <img
        :src="require('@/assets/icons/auth/' + (showPassword ? 'icon-eye-disabled-24x24.svg' : 'icon-eye-brown-24x24.svg'))"
        @click="togglePwdVisibility"
        class="input-text__icon input-text__icon--btn"
        role="button"
        alt="Icon eye"/>
  </div>
  <SimpleButton text="Login" @click="login"/>
</template>
<script lang="ts">
import {ref} from "vue";
import {apiMethodLogin} from "@/api/auth/auth.api";
import {IAuthLoginResponse} from "@/interfaces/api/auth.interface";
import {saveIntoLocalStorage} from "@/pages/game/helpers/local-storage.helper";
import {LocalStorageKeyEnum} from "@/enums/local-storage-key.enum";
import SimpleButton from "@/pages/shared/components/buttons/SimpleButton.vue";
import {LoaderService} from "@/services/loader.service";

export default {
  name: 'LoginForm',
  components: {
    SimpleButton
  },
  emits: ['login-error', 'login-success'],
  setup(props: any, context: any) {
    const loginInput = ref('');
    const passwordInput = ref('');
    const showPassword = ref(false);

    const login = () => {
      // event.preventDefault();
      LoaderService.showLoader();
      apiMethodLogin(loginInput.value, passwordInput.value).then((response: IAuthLoginResponse) => {
        saveIntoLocalStorage(LocalStorageKeyEnum.AuthToken, response.token);
        saveIntoLocalStorage(LocalStorageKeyEnum.PlayerId, response.playerId);
        context.emit('login-success', response);
      }).catch((error: any) => {
        context.emit('login-error', error)
      }).finally(() => LoaderService.hideLoader());
    };

    const togglePwdVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    return {loginInput, passwordInput, showPassword, login, togglePwdVisibility};
  }
}
</script>
<style lang="scss">
@import "../../../../assets/styles/components/page/buttons";
@import "../../../../assets/styles/components/page/inputs";

.login-form {
  &__login-btn {
    margin-top: 0.25rem;
  }
}
</style>
