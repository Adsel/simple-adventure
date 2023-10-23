<template>
  <div class="button__wrapper login-form__login-btn" @click="onClick">
    <button class="button__btn">{{ text }}</button>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      required: true
    },
  },
  emits: ['click'],
  setup(props: any, context: any) {
    const onClick = () => {
      context.emit('click');
    };

    return {onClick};
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../assets/styles/components/page/buttons";
</style>
