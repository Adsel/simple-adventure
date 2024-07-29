<template>
  <LobbyForm title="auth.headers.registration"
             id="registerForm"
             action-title="auth.headers.register"
             @submit="onSubmit">
    <LobbyFormInput :error-msg="errors?.email"
                    ref="emailInputRef"
                    label="email.headers.enter-email"
                    name="email"
                    id="email"
                    type="email"/>
    <LobbyFormInput :error-msg="errors?.login"
                    ref="loginInputRef"
                    label="login.fields.enter-login"
                    name="login"
                    id="login"/>
    <LobbyFormInput :error-msg="errors?.password"
                    :show-password="showPassword"
                    ref="passwordInputRef"
                    label="login.fields.enter-password"
                    name="password"
                    id="password"
                    type="password"
                    @toggle-visibility="togglePwdVisibility"/>
    <LobbyFormInput :error-msg="errors?.passwordRepeat"
                    :show-password="showPassword"
                    ref="passwordRepeatInputRef"
                    label="login.fields.enter-password-repeat"
                    name="passwordRepeat"
                    id="passwordRepeat"
                    type="password"
                    @toggle-visibility="togglePwdVisibility"/>
    <LobbyFormInput :error-msg="errors?.terms"
                    ref="termsInputRef"
                    text="terms.fields.content"
                    name="terms"
                    id="terms"
                    type="checkbox"/>
    <LobbyFormInput :error-msg="errors?.privacy"
                    ref="termsPrivacyInputRef"
                    text="terms.fields.privacy"
                    name="termsPrivacy"
                    id="termsPrivacy"
                    type="checkbox"/>
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
import {LoginSchema} from "@/schemas/validation/auth/login.schema";
import {PasswordSchema} from "@/schemas/validation/auth/password.schema";
import LobbyFormInput from "@/pages/shared/lobby-layout/forms/components/inputs/LobbyFormInput.vue";
import LobbyForm from "@/pages/shared/lobby-layout/forms/LobbyForm.vue";
import {useI18n} from "vue-i18n";
import {EMailSchema} from "@/schemas/validation/auth/e-mail.schema";
import {TermsSchema} from "@/schemas/validation/auth/terms.schema";

export default {
  name: 'RegistrationForm',
  components: {
    LobbyForm,
    LobbyFormInput,
  },
  emits: ['login-error', 'login-success'],
  setup(props: any, context: any) {
    const {t} = useI18n();
    const emailInputRef = ref<any>(null);
    const errors = ref<any>({});
    const loginInputRef = ref<any>(null);
    const passwordInputRef = ref<any>(null);
    const passwordRepeatInputRef = ref<any>(null);
    const showPassword = ref(false);
    const termsInputRef = ref<any>(null);
    const termsPrivacyInputRef = ref<any>(null);

    const onSubmit = async () => {
      await validateForm();
      if (Object.keys(errors.value).length === 0) {
        register();
      }
    };

    const validateForm = async () => {
      if (passwordRepeatInputRef.value.getValue() !== passwordInputRef.value.getValue()) {
        errors.value['password'] = t('password.validation.not-identical');
        errors.value['passwordRepeat'] = t('password.validation.not-identical');
      }

      try {
        errors.value = {};
        await yup.object().shape({
          login: LoginSchema(yup, t),
          password: PasswordSchema(yup, t),
          passwordRepeat: PasswordSchema(yup, t),
          email: EMailSchema(yup, t),
          terms: TermsSchema(yup, t),
          privacy: TermsSchema(yup, t),
        }).validate({
          login: loginInputRef.value.getValue() || '',
          password: passwordInputRef.value.getValue() || '',
          passwordRepeat: passwordRepeatInputRef.value.getValue() || '',
          email: emailInputRef.value.getValue() || '',
          terms: termsInputRef.value.getValue() || false,
          privacy: termsPrivacyInputRef.value.getValue() || false,
        }, {abortEarly: false});
      } catch (err: any) {
        const validationErrors: any = {};
        err.inner.forEach((error: any) => {
          validationErrors[error.path] = error.message;
        });

        errors.value = validationErrors;
      }
    };

    const register = () => {
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
      emailInputRef,
      loginInputRef,
      passwordInputRef,
      passwordRepeatInputRef,
      showPassword,
      termsInputRef,
      termsPrivacyInputRef,
      onSubmit,
      togglePwdVisibility
    };
  }
}
</script>
<style lang="scss">
@import 'login-form';
</style>
