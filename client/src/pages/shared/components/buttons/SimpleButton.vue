<template>
  <div class="button__wrapper login-form__login-btn">
    <button class="button__btn" @click="onClick($event)">
      {{ text }}
    </button>
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
    const onClick = (event: any) => {
      event.preventDefault();
      context.emit('click');
    };

    return {onClick};
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../assets/styles/components/page/buttons";
</style>
