<template>
  <div class="link__wrapper">
    <template v-if="href">
      <a :href="href"
         class="link__btn"
         @click="onClick($event)">
        {{ text }}
      </a>
    </template>
    <template v-else>
      <span class="link__btn"
            @click="onClick($event)">
        {{ text }}
      </span>
    </template>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: false
    }
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
@import "../../../../assets/styles/components/page/links";
</style>
