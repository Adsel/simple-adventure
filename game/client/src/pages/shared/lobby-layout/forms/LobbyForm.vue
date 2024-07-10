<template>
  <form :id="id">
    <div>
      <h2>{{ $t(title) }}</h2>
    </div>
    <slot/>
    <SimpleButton :text="$t(actionTitle)" type="submit" @click="onSubmit"/>
  </form>
</template>
<script lang="ts">
import SimpleButton from "@/pages/shared/components/buttons/SimpleButton.vue";

export default {
  name: 'LobbyForm',
  components: {
    SimpleButton
  },
  emits: [
      'submit'
  ],
  props: {
    title: {
      type: String,
      required: true
    },
    actionTitle: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: false,
      default: 'form'
    }
  },
  setup(props: any, context: any) {
    const onSubmit = (event: any) => {
      event.preventDefault();
      context.emit('submit', event);
    };

    return {
      onSubmit
    }
  }
}
</script>
<style lang="scss" scoped>
@import "_lobby-form";
</style>
