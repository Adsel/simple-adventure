<template>
  <LobbyLayout>
    <LoginForm @login-success="onLoginSuccess" @login-error="onLoginError"/>
  </LobbyLayout>
</template>
<script lang="ts">
import {toast} from 'vue3-toastify';
// TODO:
// split into Template component (reusable - one import styles)
import 'vue3-toastify/dist/index.css';
import {useRouter} from "vue-router";
import {IAuthLoginResponse} from "@/interfaces/api/auth.interface";
import {RoutesEnum} from "@/enums/routing/routes.enum";
import LobbyLayout from "@/pages/shared/lobby-layout/LobbyLayout.vue";
import LoginForm from "@/pages/home/components/login/LoginForm.vue";

export default {
  name: 'HomePage',
  components: {LoginForm, LobbyLayout},
  setup() {
    const router = useRouter();

    const onLoginError = (event: Error) => toast.error(event.message);

    const onLoginSuccess = (event: IAuthLoginResponse) => {
      console.log('onLoginSuccess', event);
      toast.success('Login successful');
      router.push(RoutesEnum.Lobby);
    };

    return {onLoginError, onLoginSuccess};
  }
}
</script>
