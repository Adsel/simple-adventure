<template>
  <div>
    <h2>Remind password</h2>
  </div>
  <div class="input-text__wrapper">
    <label for="login" class="input-text__label">Enter your Login or E-mail</label>
    <input type="text" name="login" class="input-text__input" id="login" v-model="loginOrMailInput">
  </div>
  <SimpleButton text="Remind me"
                @click="remindPassword"/>
</template>
<script lang="ts">
import {ref} from "vue";
import SimpleButton from "@/pages/shared/components/buttons/SimpleButton.vue";
import {apiMethodRemindPassword} from "@/api/auth/auth.api";
import {LoaderService} from "@/services/loader.service";

export default {
  name: 'RemindPasswordForm',
  components: {
    SimpleButton
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

    return {
      remindPassword,
      loginOrMailInput
    };
  }
}
</script>
<style lang="scss">
@import "../../../../assets/styles/components/page/buttons";
@import "../../../../assets/styles/components/page/inputs";

.reminder-form {
  &__btn {
    margin-top: 0.25rem;
  }
}
</style>
