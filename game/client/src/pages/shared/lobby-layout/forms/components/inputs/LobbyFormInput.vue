<template>
  <div class="input-text__wrapper">
    <label :for="id"
           class="input-text__label">
      {{ $t(label) }}
    </label>
    <template v-if="type === 'password'">
      <input :type="showPassword ? 'text' : 'password'"
             :name="name"
             class="input-text__input input-text__input--icon"
             :class="{ 'input-text__input--invalid' : errorMsg }"
             id="password"
             v-model="input">
      <img class="input-text__icon input-text__icon--btn"
           role="button"
           alt="Icon eye"
           :src="require('@/assets/icons/auth/' + (showPassword ? 'icon-eye-disabled-24x24.svg' : 'icon-eye-brown-24x24.svg'))"
           :title="showPassword ? $t('generic.hide') : $t('generic.show')"
           @click="emitPwdVisibility"/>
    </template>
    <template v-else>
      <input :type="type"
             :name="name"
             :id="id"
             class="input-text__input"
             :class="{ 'input-text__input--invalid' : errorMsg }"
             v-model="input">
    </template>
  </div>
  <div v-if="errorMsg" class="input-validator__wrapper">
    <span>{{ errorMsg }}</span>
  </div>
</template>
<script lang="ts">
import {ref} from "vue";
import {LobbyFormInputProps} from "@/pages/shared/lobby-layout/forms/components/inputs/lobby-form-input.props";

export default {
  name: 'LobbyFormInput',
  emits: [
    'submit',
    'toggle-visibility'
  ],
  props: LobbyFormInputProps,
  setup(props: any, context: any) {
    const input = ref('');

    const getValue = () => {
      return input.value;
    };

    const emitPwdVisibility = () => {
      context.emit('toggle-visibility');
    };

    return {
      input,
      emitPwdVisibility,
      getValue
    }
  }
}
</script>
<style lang="scss" scoped>
@import "_lobby-form-input";
</style>
