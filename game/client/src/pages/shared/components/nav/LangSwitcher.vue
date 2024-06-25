<template>
  <div class="language-selector">
    <button @click="toggleDropdown" class="language-button">
      {{ $t(localeLabel) }}
      <span class="arrow" :class="{ open: isOpen }">
        <img src="@/assets/icons/nav/arrow-down-24x24.png"
             alt="Arrow down icon"
             width="48"
             height="48"
        />
      </span>
    </button>
    <div v-if="isOpen" class="dropdown">
      <div v-for="lang in languages"
           :key="lang.code"
           class="dropdown-item"
           @click="changeLanguage(lang.code)"
      >
        <img :src="require('@/assets/icons/lang/' + lang.flag)"
             width="48"
             height="48"
             class="pixel-image__img language-selector-option__flag"
             :alt="$t(lang.label)"/>
        {{ $t(lang.label) }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {ref} from "vue";
import {useI18n} from "vue-i18n";

export default {
  setup() {
    const {locale} = useI18n();
    const localeLabel = ref<string>('');

    const languages = [
      {code: 'en', label: 'lang.en.us', flag: 'icon-flag-en-us-24x24.svg'},
      {code: 'pl', label: 'lang.pl', flag: 'icon-flag-pl-24x24.svg'},
    ];

    const isOpen = ref(false);

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const changeLanguage = (newLocale: string) => {
      locale.value = newLocale;
      localeLabel.value = languages.find(item => item.code === newLocale)?.label || '';
      isOpen.value = false;
    };

    return {
      localeLabel,
      languages,
      isOpen,
      toggleDropdown,
      changeLanguage,
    };
  },
};
</script>
<style lang="scss" scoped>
@import 'lang-switcher';
</style>
