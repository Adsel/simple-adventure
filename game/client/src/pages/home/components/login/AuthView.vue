<template>
  <div class="board-panel__wrapper">
    <div class="board-panel__content">
      <form class="auth-view__wrapper">
        <LoginForm v-if="mode === 'login'"
                   @login-success="onLoginSuccess"
                   @login-error="onLoginError"
        />
        <RemindPasswordForm v-if="mode === 'remind-password'"
                            @remind-password-success="onRemindPasswordRequest"
                            @remind-password-error="onRemindPasswordRequestError"/>
        <RegistrationForm v-if="mode === 'registration'"
                          @registration-success="onLoginSuccess"
                          @registration-error="onLoginError"/>
        <div class="auth-view__extra-operations">
          <template v-for="link of links" :key="link.id">
            <SimpleLink :text="$t(link.name)" @click="changeMode(link.mode)"/>
          </template>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import {onBeforeMount, ref} from "vue";
import SimpleLink from "@/pages/shared/components/links/SimpleLink.vue";
import LoginForm from "@/pages/home/components/login/LoginForm.vue";
import RemindPasswordForm from "@/pages/home/components/login/RemindPasswordForm.vue";
import {AUTH_AVAILABLE_ACTIONS} from "@/constants/auth/modes/auth-view-mode.constant";
import {IAuthMode, IAuthModes} from "@/interfaces/auth/auth-modes.interface";
import RegistrationForm from "@/pages/home/components/login/RegistrationForm.vue";

export default {
  name: 'AuthView',
  components: {
    RegistrationForm,
    RemindPasswordForm,
    SimpleLink,
    LoginForm
  },
  emits: ['login-error', 'login-success', 'remind-password-success', 'remind-password-error'],
  setup(props: any, context: any) {
    const mode = ref('login');
    const links = ref<IAuthMode[]>([]);

    onBeforeMount(() => {
      changeMode('login');
    });

    const changeMode = (modeValue: keyof IAuthModes) => {
      mode.value = modeValue;
      links.value = AUTH_AVAILABLE_ACTIONS[modeValue];
    };

    const onLoginError = (event: any) => {
      context.emit('login-error', event);
    };

    const onLoginSuccess = (event: any) => {
      context.emit('login-success', event);
    };

    const onRemindPasswordRequest = (event: any) => {
      context.emit('remind-password-success', event);
    }

    const onRemindPasswordRequestError = (event: any) => {
      context.emit('remind-password-error', event);
    }

    return {
      links,
      mode,
      changeMode,
      onLoginError,
      onLoginSuccess,
      onRemindPasswordRequest,
      onRemindPasswordRequestError,
    }
  }
}
</script>
<style scoped lang="scss">
@import 'auth-view';
</style>
