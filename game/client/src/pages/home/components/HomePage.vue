<template>
  <AuthView @login-success="onLoginSuccess"
            @login-error="onLoginError"
            @remind-password-success="onRemindPasswordSuccess"
            @remind-password-error="onRemindPasswordError"
  />
</template>
<script lang="ts">
import {toast} from 'vue3-toastify';
import {useRouter} from "vue-router";
import {IAuthLoginResponse} from "@/interfaces/api/auth.interface";
import {Routes} from "@/enums/routing/routes.enum";
import AuthView from "@/pages/home/components/login/AuthView.vue";

export default {
  name: 'HomePage',
  components: {
    AuthView
  },
  setup() {
    const router = useRouter();

    const onLoginError = (event: Error) => toast.error(event.message);

    const onLoginSuccess = (event: IAuthLoginResponse) => {
      console.log('onLoginSuccess', event);
      toast.success('Login successful');
      router.push(Routes.Lobby);
    };

    const onRemindPasswordSuccess = (event: any) => {
      console.log('onRemindPasswordSuccess', event);
      // TODO:
      // prompt or sth
    };

    const onRemindPasswordError = (event: Error) => toast.error(event.message);

    return {
      onLoginError,
      onLoginSuccess,
      onRemindPasswordSuccess,
      onRemindPasswordError
    };
  }
}
</script>
