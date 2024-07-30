<template>
  <LobbyForm title="auth.headers.sign-in"
             id="loginForm"
             action-title="login.fields.login"
             @submit="onSubmit">
    <LobbyFormInput :error-msg="errors.login ? errors.login : null"
                    ref="loginInputRef"
                    label="login.fields.enter-login"
                    name="login"
                    id="login"/>
    <LobbyFormInput :error-msg="errors.password ? errors.password : null"
                    :show-password="showPassword"
                    ref="passwordInputRef"
                    label="login.fields.enter-password"
                    name="password"
                    type="password"
                    id="password"
                    @toggle-visibility="togglePwdVisibility"/>
  </LobbyForm>
</template>
<script lang="ts">
import * as yup from 'yup';
import {ref} from "vue";
import {apiMethodLogin} from "@/api/auth/auth.api";
import {IAuthLoginResponse} from "@/interfaces/api/auth.interface";
import {saveIntoLocalStorage} from "@/pages/game/helpers/local-storage.helper";
import {LocalStorageKeyEnum} from "@/enums/local-storage-key.enum";
import {LoaderService} from "@/services/loader.service";
import {LoginSchema} from "shared/schemas/validation/auth/login.schema";
import {PasswordSchema} from "shared/schemas/validation/auth/password.schema";
import LobbyFormInput from "@/pages/shared/lobby-layout/forms/components/inputs/LobbyFormInput.vue";
import LobbyForm from "@/pages/shared/lobby-layout/forms/LobbyForm.vue";
import {useI18n} from "vue-i18n";

export default {
  name: 'LoginForm',
  components: {
    LobbyForm,
    LobbyFormInput,
  },
  emits: ['login-error', 'login-success'],
  setup(props: any, context: any) {
    const {t} = useI18n();
    const loginInputRef = ref<any>(null);
    const passwordInputRef = ref<any>(null);
    const showPassword = ref(false);
    const errors = ref<any>({});

    const onSubmit = async () => {
      await validateForm();
      if (Object.keys(errors.value).length === 0) {
        login();
      }
    };

    const validateForm = async () => {
      try {
        await yup.object().shape({
          login: LoginSchema(yup, t),
          password: PasswordSchema(yup, t),
        }).validate({
          login: loginInputRef.value.getValue() || '',
          password: passwordInputRef.value.getValue() || '',
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

    const login = () => {
      LoaderService.showLoader();
      apiMethodLogin(
          loginInputRef.value.getValue(),
          passwordInputRef.value.getValue()
      ).then((response: IAuthLoginResponse) => {
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

    return {
      errors,
      loginInputRef,
      passwordInputRef,
      showPassword,
      onSubmit,
      togglePwdVisibility
    };
  }
}
</script>
<style lang="scss">
@import 'login-form';
</style>
