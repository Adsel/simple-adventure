<template>
  <div class="board-panel__wrapper">
    <div class="board-panel__content">
      <form class="auth-view__wrapper">
        <LoginForm v-if="mode === 'login'"
                   @login-success="onLoginSuccess"
                   @login-error="onLoginError"
        />
        <RemindPasswordForm v-if="mode === 'remind-password'"/>
        <div class="auth-view__extra-operations">
          <template v-for="link of links" :key="link.id">
            <SimpleLink :text="link.name" @click="changeMode(link.mode)"/>
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

export default {
  name: 'AuthView',
  components: {
    RemindPasswordForm,
    SimpleLink,
    LoginForm
  },
  emits: ['login-error', 'login-success'],
  setup(props: any, context: any) {
    const mode = ref('login');
    const links = ref([]);
    const availableActions = AUTH_AVAILABLE_ACTIONS;

    onBeforeMount(() => {
      changeMode('login');
    })

    const changeMode = (modeValue) => {
      mode.value = modeValue;
      links.value = availableActions[modeValue];
    };

    const onLoginError = (event) => {
      context.emit('login-error', event);
    };

    const onLoginSuccess = (event) => {
      context.emit('login-success', event);
    };

    return {
      links,
      mode,
      changeMode,
      onLoginError,
      onLoginSuccess,
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../../../assets/styles/components/page/panels";
@import "../../../../assets/styles/definitions/units";

.auth-view {
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: $px-12;
  }

  &__extra-operations {
    margin-top: $px-16;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
