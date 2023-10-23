<template>
  <div class="board-panel__wrapper">
    <div class="board-panel__content">
      <form class="login-form__wrapper">
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
          <img :src="require('@/assets/icons/' + (showPassword ? 'icon-eye-disabled-24x24.svg' : 'icon-eye-brown-24x24.svg'))"
               @click="togglePwdVisibility"
               class="input-text__icon input-text__icon--btn"
               role="button"
               alt="Icon eye"/>
        </div>
        <SimpleButton text="Login" @click="login"/>
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
import SimpleButton from "@/pages/shared/components/buttons/SimpleButton.vue";

export default {
  name: 'LoginForm',
  components: {SimpleButton},
  emits: ['login-error', 'login-success'],
  setup(props: any, context: any) {
    const loginInput = ref('');
    const passwordInput = ref('');
    const showPassword = ref(false);

    const login = (event: Event) => {
      event.preventDefault();
      apiMethodLogin(loginInput.value, passwordInput.value).then((response: IAuthLoginResponse) => {
        saveIntoLocalStorage(LocalStorageKeyEnum.AuthToken, response.token);
        context.emit('login-success', response);
      }).catch((error: any) => {
        context.emit('login-error', error)
      });
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
@import "../../../../assets/styles/components/page/panels";
@import "../../../../assets/styles/definitions/units";

.login-form {
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: $px-12;
  }

  &__login-btn {
    margin-top: 1rem;
  }
}
</style>
