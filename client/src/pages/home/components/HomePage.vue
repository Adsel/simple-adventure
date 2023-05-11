<template>
    <div class="page__wrapper">
        <GameTitle></GameTitle>
        <LoginForm @login-success="onLoginSuccess" @login-error="onLoginError"/>
    </div>
</template>
<script lang="ts">
import LoginForm from "@/pages/home/components/login/LoginForm.vue";

import {toast} from 'vue3-toastify';
// TODO:
// split into Template component (reusable - one import styles)
import 'vue3-toastify/dist/index.css';
import {useRouter} from "vue-router";
import {IAuthLoginResponse} from "@/interfaces/api/auth.interface";
import GameTitle from "@/pages/shared/game-title/GameTitle.vue";

export default {
    name: 'HomePage',
    components: {GameTitle, LoginForm},
    setup() {
        const router = useRouter();

        const onLoginError = (event: Error) => toast.error(event.message);

        const onLoginSuccess = (event: IAuthLoginResponse) => {
            console.log('onLoginSuccess', event);
            router.push('/game');
        };

        return {onLoginError, onLoginSuccess};
    }
}
</script>
<style lang="scss">
@import "../../../assets/styles/definitions/toastify";
@import "../../../assets/styles/definitions/colors";

.page {
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
