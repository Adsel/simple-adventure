<template>
  <LobbyForm title="auth.headers.remind-password"
             id="loginForm"
             action-title="login.fields.remind-me"
             @submit="onSubmit">
    <LobbyFormInput :error-msg="errors.login ? errors.login : null"
                    ref="loginOrMailInputRef"
                    label="login.fields.enter-login-email"
                    name="login"
                    id="login"/>
  </LobbyForm>
</template>
<script lang="ts">
import * as yup from "yup";
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import {apiMethodRemindPassword} from "@/api/auth/auth.api";
import {LoaderService} from "@/services/loader.service";
import {LoginSchema} from "shared/schemas/validation/auth/login.schema";
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
    const {t} = useI18n();
    const errors = ref<any>({});
    const loginOrMailInputRef = ref<any>(null);

    const validateForm = async () => {
      try {
        await yup.object().shape({
          login: LoginSchema(yup, t),
        }).validate({
          login: loginOrMailInputRef.value.getValue() || '',
        }, {abortEarly: false});
        errors.value = {};
      } catch (err: any) {
        const validationErrors: any = {};
        err.inner.forEach((error: any) => {
          validationErrors[error.path] = error.message;
        });

        errors.value = validationErrors;
      }
    };

    const remindPassword = async () => {
      await validateForm();
      if (Object.keys(errors.value).length !== 0) {
        context.emit('remind-password-error', {
          message: errors.value.login
        });
        return;
      }

      apiMethodRemindPassword(loginOrMailInputRef.value.trim()).then((response: any) => {
        context.emit('remind-password-success', response);
      }).catch((error: any) => {
        context.emit('remind-password-error', error)
      }).finally(() => LoaderService.hideLoader());
    };

    const onSubmit = () => {
      remindPassword();
    };

    return {
      errors,
      loginOrMailInputRef,
      onSubmit,
      remindPassword
    };
  }
}
</script>
<style lang="scss">
@import 'remind-password-form';
</style>
