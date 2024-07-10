<template>
  <div class="button__wrapper login-form__login-btn"
       :class="{
        'button__wrapper--success': type === 'success',
        'button__wrapper--error': type === 'error'
      }">
    <button class="button__btn"
            :type="type ? type : 'button'"
            @click="onClick($event)">
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
    type: {
      type: String,
      required: false
    }
  },
  emits: ['click'],
  setup(props: any, context: any) {
    const onClick = (event: any) => {
      event.preventDefault();
      context.emit('click', event);
    };

    return {onClick};
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../assets/styles/components/page/buttons";
</style>
