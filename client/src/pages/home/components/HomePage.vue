<template>
    <div class="page__wrapper">
        <h1 class="page__title">
            <img src="@/assets/logotype.png"
                 width="32"
                 height="32"
                 alt="Simple Adventure logotype"
                 class="pixel-image__img">
            Simple Adventure
        </h1>
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

export default {
    name: 'HomePage',
    components: {LoginForm},
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
@import "../../../assets/styles/components/page/pixeled-image";
@import "../../../assets/styles/definitions/toastify";
@import "../../../assets/styles/definitions/colors";

.page {
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  &__title {
    display: flex;
    gap: 10px;
    align-items: center;
  }
}
</style>
