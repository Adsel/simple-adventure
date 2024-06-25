<template>
  <form>
    <div>
      <h2>{{ $t('login.headers.sign-in')}}</h2>
    </div>
    <div>
      <div>
        <div class="input-text__wrapper">
          <label for="login" class="input-text__label">
            {{ $t('login.fields.enter-login')}}
          </label>
          <input type="text"
                 name="login"
                 class="input-text__input"
                 :class="{ 'input-text__input--invalid' : errors.password }"
                 id="login"
                 v-model="form.login">
        </div>
        <div v-if="errors.login" class="input-validator__wrapper">
          <span>{{ errors.login }}</span>
        </div>
      </div>
      <div>
        <div class="input-text__wrapper">
          <label for="password" class="input-text__label">
            {{ $t('login.fields.enter-password')}}
          </label>
          <input :type="showPassword ? 'text' : 'password'"
                 name="password"
                 class="input-text__input input-text__input--icon"
                 :class="{ 'input-text__input--invalid' : errors.password }"
                 id="password"
                 v-model="form.password">
          <img class="input-text__icon input-text__icon--btn"
               role="button"
               alt="Icon eye"
               :src="require('@/assets/icons/auth/' + (showPassword ? 'icon-eye-disabled-24x24.svg' : 'icon-eye-brown-24x24.svg'))"
               :title="showPassword ? $t('generic.hide') : $t('generic.show')"
               @click="togglePwdVisibility"/>
        </div>
        <div v-if="errors.password" class="input-validator__wrapper">
          <span>{{ errors.password }}</span>
        </div>
      </div>
    </div>
    <SimpleButton :text="$t('login.fields.login')"
                  @click="onLoginSubmit"
                  type="submit"/>
  </form>
</template>
<script lang="ts">
import {ref} from "vue";
import {apiMethodLogin} from "@/api/auth/auth.api";
import {IAuthLoginResponse} from "@/interfaces/api/auth.interface";
import {saveIntoLocalStorage} from "@/pages/game/helpers/local-storage.helper";
import {LocalStorageKeyEnum} from "@/enums/local-storage-key.enum";
import SimpleButton from "@/pages/shared/components/buttons/SimpleButton.vue";
import {LoaderService} from "@/services/loader.service";
import * as yup from 'yup';
import {AUTH_REQUIREMENTS} from "@/config/auth.config";

export default {
  name: 'LoginForm',
  components: {
    SimpleButton
  },
  emits: ['login-error', 'login-success'],
  setup(props: any, context: any) {
    const form = ref({
      login: '',
      password: '',
    });
    const errors = ref({});
    const showPassword = ref(false);
    // TODO:
    // split into separated definitions (to registration usage)
    const schema = yup.object().shape({
      login: yup.string()
          .min(AUTH_REQUIREMENTS.fields.login.min, `Login must be at least ${AUTH_REQUIREMENTS.fields.login.min} characters long!`)
          .max(AUTH_REQUIREMENTS.fields.login.max, `Login can be at most ${AUTH_REQUIREMENTS.fields.login.max} characters long!`)
          .required('Login is required!'),
      password: yup.string()
          .min(AUTH_REQUIREMENTS.fields.password.min, `Password must be at least ${AUTH_REQUIREMENTS.fields.password.min} characters long!`)
          .max(AUTH_REQUIREMENTS.fields.password.max, `Password can be at most ${AUTH_REQUIREMENTS.fields.password.max} characters long!`)
          .matches(AUTH_REQUIREMENTS.fields.password.rules.alpha, 'Password must contain at least one letter!')
          .matches(AUTH_REQUIREMENTS.fields.password.rules.number, 'Password must contain at least one number!')
          .matches(AUTH_REQUIREMENTS.fields.password.rules.char, 'Password must contain at least one special character!')
          .required('Password is required!'),
    });

    const validateForm = async () => {
      try {
        await schema.validate(form.value, {abortEarly: false});
        errors.value = {};
      } catch (err: any) {
        const validationErrors: any = {};
        err.inner.forEach((error: any) => {
          validationErrors[error.path] = error.message;
        });
        errors.value = validationErrors;
      }
    };

    const onLoginSubmit = async () => {
      await validateForm();
      if (Object.keys(errors.value).length === 0) {
        login();
      }
    };

    const login = () => {
      // event.preventDefault();
      LoaderService.showLoader();
      apiMethodLogin(form.value.login, form.value.password).then((response: IAuthLoginResponse) => {
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
      form,
      showPassword,
      onLoginSubmit,
      togglePwdVisibility
    };
  }
}
</script>
<style lang="scss">
@import 'login-form';
</style>
