<template>
  <LobbyForm title="login.headers.remind-password"
             action-title="login.fields.remind-me"
             @submit="onSubmit">
    <LobbyFormInput label="login.fields.enter-login-email" name="login" id="login" />
  </LobbyForm>
</template>
<script lang="ts">
import {ref} from "vue";
import {apiMethodRemindPassword} from "@/api/auth/auth.api";
import {LoaderService} from "@/services/loader.service";
import LobbyForm from "@/pages/shared/lobby-layout/forms/LobbyForm.vue";
import LobbyFormInput from "@/pages/shared/lobby-layout/forms/components/inputs/LobbyFormInput.vue";

export default {
  name: 'RemindPasswordForm',
  components: {
    LobbyForm,
    LobbyFormInput,
  },
  emits: ['remind-password-success', 'remind-password-error'],
  setup(setup: any, context: any) {
    const loginOrMailInput = ref('');

    const isInputValid = () => {
      return loginOrMailInput.value !== '' && loginOrMailInput.value.trim().length > 0;
    };

    const remindPassword = () => {
      if (!isInputValid()) {
        context.emit('remind-password-error', {
          message: 'Invalid login or e-mail!'
        });
        return;
      }

      apiMethodRemindPassword(loginOrMailInput.value.trim()).then((response: any) => {
        context.emit('remind-password-success', response);
      }).catch((error: any) => {
        context.emit('remind-password-error', error)
      }).finally(() => LoaderService.hideLoader());
    };

    const onSubmit = () => {
      remindPassword();
    };

    return {
      loginOrMailInput,
      onSubmit,
      remindPassword
    };
  }
}
</script>
<style lang="scss">
@import 'remind-password-form';
</style>
